const searchCache = new Map();
const objectCache = new Map();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJsonWithRetry(url, label, retries = 1) {
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

        // Do not retry 403 or 404 responses.
        if (response.status === 403 || response.status === 404) {
          return null;
        }

        // Retry other failed requests if another attempt is available.
        if (attempt <= retries) {
          await delay(500);
          continue;
        }

        return null;
      }

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        console.log(`${label} did not return JSON. Attempt: ${attempt}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.log(`${label} error: ${error.message}. Attempt: ${attempt}`);

      if (attempt <= retries) {
        await delay(500);
        continue;
      }

      return null;
    }
  }

  return null;
}

async function getObjectIdsForSearch(query, withImages) {
  const normalizedQuery = query.trim().toLowerCase();
  const cacheKey = `${normalizedQuery}:${withImages}`;

  if (searchCache.has(cacheKey)) {
    return searchCache.get(cacheKey);
  }

  const imageFilter = withImages ? "&hasImages=true" : "";

  const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(
    normalizedQuery)}${imageFilter}`;

  const data = await fetchJsonWithRetry(searchUrl, "Met search request");

  if (!data) {
    return null;
  }

  const objectIDs = data.objectIDs ?? [];

  searchCache.set(cacheKey, objectIDs);

  return objectIDs;
}



async function fetchMetObject(id) {
  const cacheKey = String(id);

  if (objectCache.has(cacheKey)) {
    return objectCache.get(cacheKey);
  }

  const objectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${cacheKey}`;

  const artefact = await fetchJsonWithRetry(objectUrl, `Object ${cacheKey}`, 1);

  if (artefact) {
    objectCache.set(cacheKey, artefact);
  }

  return artefact;
}


export async function searchArtefacts(req, res) {
  try {
    const query = req.query.query;
    const withImages = req.query.withImages === "true";
    const parsedPage = Number.parseInt(req.query.page, 10);
    const parsedLimit = Number.parseInt(req.query.limit, 10);

    const page =
      Number.isInteger(parsedPage) && parsedPage > 0
        ? parsedPage
        : 1;

    const limit =
      Number.isInteger(parsedLimit) && parsedLimit > 0
        ? Math.min(parsedLimit, 20)
        : 20;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required.",
      });
    }

    const objectIDs = await getObjectIdsForSearch(query, withImages);

    if (objectIDs === null) {
        return res.status(503).json({
          message:
            "The Met API is currently not available. Please try again later.",
        });
      }

    if (objectIDs.length === 0) {
      return res.json({
        totalObjectIDs: 0,
        page,
        limit,
        results: [],
        hasPreviousPage: page > 1,
        hasNextPage: false,
      });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const idsForThisPage = objectIDs.slice(startIndex, endIndex);

    const collectedArtefacts = [];
    const batchSize = 5;

    for (
      let i = 0;
      i < idsForThisPage.length;
      i += batchSize
    ) {
      const batchIds = idsForThisPage.slice(i, i + batchSize);

      const artefacts = await Promise.all(
        batchIds.map((id) => fetchMetObject(id))
      );

      for (const artefact of artefacts) {
        if (!artefact) {
          continue;
        }

          if (
            withImages &&
            !artefact.primaryImageSmall &&
            !artefact.primaryImage
          ) {
            continue;
          }

          collectedArtefacts.push(artefact);

          if (i + batchSize < idsForThisPage.length) {
            await delay(100);
        }
      }

    }

    res.json({
      totalObjectIDs: objectIDs.length,
      page,
      limit,
      results: collectedArtefacts,
      hasPreviousPage: page > 1,
      hasNextPage: endIndex < objectIDs.length,
    });
  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      message: "Error while loading artefacts.",
    });
  }
}

export async function getArtefactById(req, res) {
  try {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        message: "Invalid artefact ID.",
      });
    }

    const artefact = await fetchMetObject(id);

    if (!artefact) {
      return res.status(404).json({
        message: "Artefact not found.",
      });
    }

    res.json(artefact);
  } catch (error) {
    console.error("Artefact details error:", error);

    res.status(500).json({
      message: "Error while loading artefact details.",
    });
  }
}