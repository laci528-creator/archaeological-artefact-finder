
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function searchArtefacts(query, page = 1, limit = 20, withImages = false) {

  const url = `${BASE_URL}/artefacts/search?query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}&withImages=${withImages}`;

  //console.log("Request URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Backend error: ${response.status} ${response.statusText}`
    );
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

export async function getFavorites() { 
  const response = await fetch(`${BASE_URL}/favorites`);
  
   if (!response.ok) {
    throw new Error("Failed to fetch favorites");
  }

  return response.json(); 
} 


export async function addFavorite(artefact) { 
  const response = await fetch(`${BASE_URL}/favorites`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      
      body: JSON.stringify(artefact), 
    }); 
    
    if (!response.ok) { 
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message || "Could not save favorite"
      ); 
    } 
    
    return response.json(); 
} 


export async function deleteFavorite(id) { 
  const response = await fetch(`${BASE_URL}/favorites/${id}`, { 
    method: "DELETE", 
  }); 

  if (!response.ok) {
    throw new Error("Could not delete favorite");
  }

  return response.json(); 
} 


export async function updateFavoriteNote(id, note) { 
  const response = await fetch(`${BASE_URL}/favorites/${id}/note`, { 
    method: "PUT", 
    headers: { "Content-Type": "application/json", }, 
    body: JSON.stringify({ note }), 
  });
  
    if (!response.ok) {
    throw new Error("Could not update favorite note");
  }

  return response.json(); 
}