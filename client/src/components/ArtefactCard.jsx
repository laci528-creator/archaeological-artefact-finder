import { useState } from "react";
import { Link } from "react-router-dom";
import { cleanText } from "../utils/textUtils";
import FavoriteButton from "./FavoriteButton";


function ArtefactCard({ artefact }) {

const [imageError, setImageError] = useState(false);

const imageUrl =
  artefact.primaryImageSmall ||
  artefact.primaryImage ||
  ""; 

  return (
    <article className="artefact-card">
      {imageUrl && !imageError  ? (
        <img
          src={imageUrl}
          alt={artefact.title || "Artefact"}
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="image-placeholder">No image available</div>
      )}

      <h2>{cleanText(artefact.title) || "Untitled object"}</h2>

      <p>
        <strong>Culture:</strong>{" "}
        {cleanText(artefact.culture) || "Unknown"}
      </p>

      <p>
        <strong>Period:</strong>{" "}
        {cleanText(artefact.period) || "Unknown"}
      </p>

      <p>
        <strong>Medium:</strong>{" "}
        {cleanText(artefact.medium) || "Unknown"}
      </p>

      <div className="card-actions">
        <Link
          to={`/artefacts/${artefact.objectID}`}
          className="button button-primary"
        >
          Details
        </Link>

        <FavoriteButton artefact={artefact} />
      </div>
    </article>
  );
}

export default ArtefactCard;