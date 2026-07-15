
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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

