import { useEffect, useState } from "react";  
import { getFavorites, deleteFavorite, updateFavoriteNote, } from "../services/api"; 

function Favorites() { 
  const [favorites, setFavorites] = useState([]); 
  
  async function loadFavorites() { 
    const data = await getFavorites(); 
    setFavorites(data); 
  } 
  
  useEffect(() => { loadFavorites(); }, []); 
  
  async function handleDelete(id) { 
    await deleteFavorite(id); loadFavorites(); 
  } 
  
  async function handleNoteChange(id, note) { 
    await updateFavoriteNote(id, note); 
  } 
  return ( 
  <main> 
    <h1>Saved Artefacts</h1> 
  
      {favorites.map((favorite) => ( 
          <article key={favorite.id} className="artefact-card"> 
            {favorite.image_url && ( 
              <img src={favorite.image_url} alt={favorite.title} /> 
            )} 
            <h2>{favorite.title}</h2> 
            <p><strong>Culture:</strong> {favorite.culture || "Unknown"}</p> 
            <p><strong>Period:</strong> {favorite.period || "Unknown"}</p> 
            <p><strong>Medium:</strong> {favorite.medium || "Unknown"}</p> 
            <textarea defaultValue={favorite.note || ""} placeholder="Add your own note..." onBlur={(event) => handleNoteChange(favorite.id, event.target.value) } /> 
            <button onClick={() => handleDelete(favorite.id)}> Delete </button> 
          </article> 
          ))} 
    </main> 
    ); 
  } 
          
          
          
export default Favorites;