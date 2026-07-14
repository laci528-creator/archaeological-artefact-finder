import { Link } from "react-router-dom"; 

function cleanText(text) {
  if (!text) {
    return "";
  }

  return text.replace(/<[^>]*>/g, "");
}



function ArtefactCard({ artefact }) { 
    return ( 
        <article className="artefact-card"> 
        {artefact.primaryImageSmall ? ( 
            <img src={artefact.primaryImageSmall} alt={artefact.title} 
            /> ) : ( <div className="image-placeholder">No image available</div> 

            )} 
            
            <h2>{cleanText(artefact.title) || "Untitled object"}</h2> 
                <p> 
                    <strong>Culture:</strong> {cleanText(artefact.culture) || "Unknown"} 
                </p> 
                <p> 
                    <strong>Period:</strong> {cleanText(artefact.period) || "Unknown"} 
                </p> 
                <p> 
                    <strong>Medium:</strong> {cleanText(artefact.medium) || "Unknown"} 
                </p> 
                <Link to={`/artefacts/${artefact.objectID}`}>Details</Link> 
        
        </article> 
    ); 
} 

export default ArtefactCard;