import { useState } from "react";
import { addFavorite } from "../services/api";

function FavoriteButton({ artefact }) {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleAddFavorite() {
    const favoriteData = {
      object_id: artefact.objectID,
      title: artefact.title || "Untitled object",
      image_url: artefact.primaryImageSmall || artefact.primaryImage || "",
      culture: artefact.culture || "",
      period: artefact.period || "",
      medium: artefact.medium || "",
      object_url: artefact.objectURL || "",
    };

    try {
      setSaving(true);
      setMessage("");

      await addFavorite(favoriteData);

      setMessage("Saved");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="favorite-action">
      <button
        type="button"
        onClick={handleAddFavorite}
        disabled={saving}
        className="favorite-button"
      >
        {saving ? "Saving..." : "Save favorite"}
      </button>

      {message && <small>{message}</small>}
    </div>
  );
}

export default FavoriteButton;