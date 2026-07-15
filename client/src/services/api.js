

const BASE_URL = "http://localhost:5000/api";

export async function searchArtefacts(query, page = 1, limit = 20) {
  const url = `${BASE_URL}/artefacts/search?query=${encodeURIComponent(
    query
  )}&page=${page}&limit=${limit}`;

  console.log("Request URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Backend error response:", errorText);

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
      
      throw new Error("Could not save favorite"); 
    } 
    
    return response.json(); 
} 


export async function deleteFavorite(id) { 
  const response = await fetch(`${BASE_URL}/favorites/${id}`, { 
    method: "DELETE", 
  }); 
  return response.json(); 
} 


export async function updateFavoriteNote(id, note) { 
  const response = await fetch(`${BASE_URL}/favorites/${id}/note`, { 
    method: "PUT", 
    headers: { "Content-Type": "application/json", }, 
    body: JSON.stringify({ note }), 
  }); 
  return response.json(); 
}