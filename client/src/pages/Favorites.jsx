import { useEffect, useState } from "react";  
import { getFavorites, deleteFavorite, updateFavoriteNote, } from "../services/api"; 
import { Link } from "react-router-dom";

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
    
    {favorites.length === 0 ? (
      <p>No saved artefacts yet. Start exploring and save your favorite objects.</p>
    ) : (
      <section className="artefact-grid"> 
      {favorites.map((favorite) => ( 
          <article key={favorite.id} className="artefact-card"> 
            {favorite.image_url ? ( 
              <img src={favorite.image_url} alt={favorite.title} /> 
            ) : (
               <div className="image-placeholder">No image available</div>
            )} 
            <h3>{favorite.title}</h3> 
            <p><strong>Culture:</strong> {favorite.culture || "Unknown"}</p> 
            <p><strong>Period:</strong> {favorite.period || "Unknown"}</p> 
            <p><strong>Medium:</strong> {favorite.medium || "Unknown"}</p> 
            <textarea defaultValue={favorite.note || ""} placeholder="Add your own note..." onBlur={(event) => handleNoteChange(favorite.id, event.target.value) } /> 
            <div className="card-actions">
              <Link to={`/artefacts/${favorite.object_id}`}>Details</Link>
              <button onClick={() => handleDelete(favorite.id)}> Delete </button>
            </div>  
          </article> 
          ))}
          </section>
        )}
    </main> 
    ); 
  
  } 
          
          
  
export default Favorites;