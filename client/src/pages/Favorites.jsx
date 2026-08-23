import { useEffect, useState } from "react";
import {
  getFavorites,
  deleteFavorite,
  updateFavoriteNote,
} from "../services/api";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function loadFavorites() {
      try {
        setLoading(true);
        setErrorMessage("");

        const data = await getFavorites();
        setFavorites(data);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setLoading(false);
      }
    }

  useEffect(() => {
    loadFavorites();
  }, []);

  async function handleDelete(id) {
      try {
        setErrorMessage("");

        await deleteFavorite(id);
        await loadFavorites();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

  async function handleNoteChange(id, note) {
      try {
        setErrorMessage("");

        await updateFavoriteNote(id, note);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

  return (
    <main>
      <h1>Saved Artefacts</h1>

      {loading && <p>Loading saved artefacts...</p>}

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      {!loading && !errorMessage && (
        favorites.length === 0 ? (
        <p>
          No saved artefacts yet. Start exploring and save your favorite
          objects.
        </p>
      ) : (
        <section className="artefact-grid">
          {favorites.map((favorite) => (
            <article key={favorite.id} className="artefact-card">
              {favorite.image_url ? (
                <img
                  src={favorite.image_url}
                  alt={favorite.title}
                />
              ) : (
                <div className="image-placeholder">
                  No image available
                </div>
              )}

              <h2>{favorite.title}</h2>

              <p>
                <strong>Culture:</strong>{" "}
                {favorite.culture || "Unknown"}
              </p>

              <p>
                <strong>Period:</strong>{" "}
                {favorite.period || "Unknown"}
              </p>

              <p>
                <strong>Medium:</strong>{" "}
                {favorite.medium || "Unknown"}
              </p>

              <textarea
                defaultValue={favorite.note || ""}
                placeholder="Add your own note..."
                onBlur={(event) =>
                  handleNoteChange(favorite.id, event.target.value)
                }
              />

              <div className="card-actions">
                <Link
                  to={`/artefacts/${favorite.object_id}`}
                  className="details-button"
                >
                  Details
                </Link>
                <button 
                type="button"
                onClick={() => handleDelete(favorite.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )
      )}
    </main>
  );
}

export default Favorites;