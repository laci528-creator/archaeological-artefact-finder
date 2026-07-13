


const BASE_URL = "http://localhost:5000/api"; 

export async function searchArtefacts(query) { 
    const response = await fetch( 
        `${BASE_URL}/artefacts/search?query=${encodeURIComponent(query)}` 
    ); 
    
    if (!response.ok) { 
        throw new Error("Failed to fetch artefacts"); 
    } 
    
    return response.json(); 
}


export async function getArtefactById(id) { 
    const response = await fetch(`${BASE_URL}/artefacts/${id}`); 
        if (!response.ok) { 
            throw new Error("Failed to fetch artefact details"); 
        } 
        return response.json(); 
    }
    