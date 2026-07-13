import { useState } from "react"; 
import SearchBar from "../components/SearchBar"; 
import { searchArtefacts } from "../services/api";
import ArtefactList from "../components/ArtefactList"; 


function Home() { 
    
    const [searchTerm, setSearchTerm] = useState(""); 
    const [artefacts, setArtefacts] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(""); 
    
    async function handleSearch(event) { 
        event.preventDefault(); 
        
        if (!searchTerm.trim()) { 
            setErrorMessage("Please enter a search term."); 
            return; } 
            
            
        try { setLoading(true); 
            setErrorMessage(""); 
            
            const results = await searchArtefacts(searchTerm); 
            setArtefacts(results); 
        } catch (error) { 
            setErrorMessage("Something went wrong while loading the artefacts."); 
        } finally { setLoading(false); 

        }
    }
    
    return ( 
        <main> 
            <h1>Archaeological Artefact Finder</h1> 
            <p>Search ancient objects from The Metropolitan Museum of Art collections.</p> 
            
            <SearchBar searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        onSearch={handleSearch} 
                        /> 
                        
                        {loading && <p>Loading artefacts...</p>} 
                        
                        {errorMessage && <p>{errorMessage}</p>} 

                        <ArtefactList artefacts={artefacts} />
                        
        </main> 
    ); 
} 


export default Home;