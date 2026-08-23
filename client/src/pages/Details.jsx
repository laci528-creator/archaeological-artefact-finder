import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { getArtefactById } from "../services/api"; 
import { cleanText } from "../utils/textUtils";

function Details() { 
    const { id } = useParams(); 
    const [artefact, setArtefact] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [errorMessage, setErrorMessage] = useState("");
    const [imageError, setImageError] = useState(false); 
    
    useEffect(() => { 
        async function loadArtefact() { 
            try { 
                const data = await getArtefactById(id); 
                                    setArtefact(data); 
            } catch (error) { 
                setErrorMessage("Could not load artefact details."); 
            } finally { 
                setLoading(false); 
            } 
        } 
        
        loadArtefact(); 
    
        }, [id]); 
        
        
        if (loading) { 
            return <main>Loading details...</main>; 
        } 
        
        
        if (errorMessage) { 
            return <main>{errorMessage}</main>; 
        } 

        const imageUrl =
            artefact.primaryImage ||
            artefact.primaryImageSmall ||
            "";

        return ( 
            <main> 
                <h1>{cleanText(artefact.title) || "Untitled object"}</h1> {imageUrl && !imageError ? ( 
                    <img className="details-img" src={imageUrl} alt={artefact.title || "Artefact"} onError={() => setImageError(true)}/> 
                ) : ( 
                <div className="image-placeholder">No image available.</div> 
                )} 
                
                <p><strong>Object name:</strong> {cleanText(artefact.objectName) || "Unknown"}</p> 
                <p><strong>Culture:</strong> {artefact.culture || "Unknown"}</p> 
                <p><strong>Period:</strong> {artefact.period || "Unknown"}</p> 
                <p><strong>Date:</strong> {artefact.objectDate || "Unknown"}</p> 
                <p><strong>Medium:</strong> {artefact.medium || "Unknown"}</p> 
                <p><strong>Dimensions:</strong> {artefact.dimensions || "Unknown"}</p> 
                <p><strong>Department:</strong> {artefact.department || "Unknown"}</p> 
                
                
                {artefact.objectURL && ( 
                    <a href={artefact.objectURL} target="_blank" rel="noreferrer"> View object on The Met website </a> 
                    
                )} 
        
            </main> 
            
    ); 
    
} 
    
    
export default Details;