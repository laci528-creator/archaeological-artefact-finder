






function SearchBar({ searchTerm, setSearchTerm, onSearch }) { 
    return ( 
        <form onSubmit={onSearch}> 
            <input 
                type="text" 
                placeholder="Search for roman coin, greek vase..." 
                value={searchTerm} 
                onChange={(event) => setSearchTerm(event.target.value)} 
                /> 
                <button type="submit">Search</button> </form> 
    );
} 
                
                

export default SearchBar;