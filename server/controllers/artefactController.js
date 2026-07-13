


export async function searchArtefacts(req, res) { 
    try { 
        const query = req.query.query; 
        
        if (!query) { 
            return res.status(400).json({ message: "Search query is required." }); } 
            
            const searchUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${encodeURIComponent(query)}`; 
            
            const response = await fetch(searchUrl); 
            const data = await response.json(); 
            
            if (!data.objectIDs || data.objectIDs.length === 0) { 
                return res.json([]); } 

            const limitedIds = data.objectIDs.slice(0, 40);

            const artefacts = await Promise.all(
            limitedIds.map(async (id) => {
                const objectResponse = await fetch(
                `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
                );

                return objectResponse.json();
            })
            );

            const filteredArtefacts = artefacts
            .filter((artefact) => {
                return (
                artefact.title &&
                artefact.title.trim() !== "" &&
                artefact.title.toLowerCase() !== "untitled object"
                );
            })
            .slice(0, 20);

            res.json(filteredArtefacts);

    } catch (error) { 
        console.error(error); 
        res.status(500).json({ message: "Error while loading artefacts." }); 
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
