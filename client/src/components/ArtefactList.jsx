import ArtefactCard from "./ArtefactCard"; 


function ArtefactList({ artefacts }) { 
        
    if (artefacts.length === 0) { 
        return <p>No artefacts found yet.</p>; 
    } 
        
    return ( 
        <section className="artefact-grid"> {artefacts.map((artefact) => ( 
                
            <ArtefactCard key={artefact.objectID} artefact={artefact} /> 
        ))}
            
        </section>
            
        ); 
} 
        
        
export default ArtefactList;