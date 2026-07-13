
const searchCache = new Map();
const objectCache = new Map();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry(url, label, retries = 2) {
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.log(
          `${label} failed. Status: ${response.status} ${response.statusText}. Attempt: ${attempt}`
        );

        if (attempt <= retries) {
          await delay(700);
          continue;
        }

        return null;
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.log(`${label} did not return JSON. Attempt: ${attempt}`);

        if (attempt <= retries) {
          await delay(700);
          continue;
        }

        return null;
      }

      return await response.json();
    } catch (error) {
      console.log(`${label} error: ${error.message}. Attempt: ${attempt}`);

      if (attempt <= retries) {
        await delay(700);
        continue;
      }

      return null;
    }
  }
}


async function getObjectIdsForSearch(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (searchCache.has(normalizedQuery)) {
    return searchCache.get(normalizedQuery);
  }

  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(
    normalizedQuery
  )}`;

  const data = await fetchJsonWithRetry(searchUrl, "Met search request");

  if (!data || !data.objectIDs) {
    return null;
  }

  searchCache.set(normalizedQuery, data.objectIDs);

  return data.objectIDs;
}

async function fetchMetObject(id) {
  if (objectCache.has(id)) {
    return objectCache.get(id);
  }

  const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;

  const artefact = await fetchJsonWithRetry(objectUrl, `Object ${id}`, 1);

  if (!artefact) {
    return null;
  }

  objectCache.set(id, artefact);

  return artefact;
}




export async function searchArtefacts(req, res) {
  try {
    const query = req.query.query;
    const page = Number.parseInt(req.query.page) || 1;
    const limit = Number.parseInt(req.query.limit) || 20;

    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const objectIDs = await getObjectIdsForSearch(query);

    if (!objectIDs || objectIDs.length === 0) {
      return res.json({
        totalObjectIDs: 0,
        page,
        limit,
        results: [],
        hasPreviousPage: page > 1,
        hasNextPage: false,
      });
    }

    const startValidIndex = (page - 1) * limit;
    const collectedArtefacts = [];
    let validArtefactCounter = 0;

    const batchSize = 5;

    outerLoop: for (let i = 0; i < objectIDs.length; i += batchSize) {
      const batchIds = objectIDs.slice(i, i + batchSize);

      const artefacts = await Promise.all(
        batchIds.map((id) => fetchMetObject(id))
      );

      for (const artefact of artefacts) {
        if (!artefact) {
          continue;
        }

        const hasValidTitle =
          artefact.title &&
          artefact.title.trim() !== "" &&
          artefact.title.toLowerCase() !== "untitled object";

        if (!hasValidTitle) {
          continue;
        }

        if (validArtefactCounter >= startValidIndex) {
          collectedArtefacts.push(artefact);
        }

        validArtefactCounter++;

        if (collectedArtefacts.length > limit) {
          break outerLoop;
        }
      }

      await delay(150);
    }

    const results = collectedArtefacts.slice(0, limit);

    res.json({
      totalObjectIDs: objectIDs.length,
      page,
      limit,
      results,
      hasPreviousPage: page > 1,
      hasNextPage: collectedArtefacts.length > limit,
    });
  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      message: "Error while loading artefacts.",
      error: error.message,
    });
  }
}



export async function getArtefactById(req, res) {
  try {
    const id = req.params.id;

    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );

    if (!response.ok) {
      return res.status(404).json({ message: "Artefact not found." });
    }

    const artefact = await response.json();

    res.json(artefact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error while loading artefact details." });
  }
}
