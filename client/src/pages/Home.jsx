import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ArtefactList from "../components/ArtefactList";
import { searchArtefacts } from "../services/api";
import hourglassLoader from "../assets/hourglass-loader.png";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [artefacts, setArtefacts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalObjectIDs, setTotalObjectIDs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

async function loadArtefacts(query, pageNumber) {
  try {
    setLoading(true);
    setErrorMessage("");

    const data = await searchArtefacts(query, pageNumber, 20);

    console.log("Backend response:", data);

    setArtefacts(data.results || []);
    setPage(data.page);
    setHasPreviousPage(data.hasPreviousPage);
    setHasNextPage(data.hasNextPage);
    setTotalObjectIDs(data.totalObjectIDs);
  } catch (error) {
    console.error("Frontend error:", error);
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
}



  async function handleSearch(event) {
    event.preventDefault();

    if (!searchTerm.trim()) {
      setErrorMessage("Please enter a search term.");
      return;
    }

    setLastSearchTerm(searchTerm);
    await loadArtefacts(searchTerm, 1);
  }

  async function handlePreviousPage() {
    if (page > 1) {
      await loadArtefacts(lastSearchTerm, page - 1);
    }
  }

  async function handleNextPage() {
    await loadArtefacts(lastSearchTerm, page + 1);
  }

  return (
    <main>
      <h1>Archaeological Artefact Finder</h1>
      <p>Search ancient objects from the Metropolitan Museum collections.</p>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {totalObjectIDs > 0 && (
        <p>
          {totalObjectIDs} matching object IDs found. Page {page}.
        </p>
      )}


      {artefacts.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={!hasPreviousPage || loading}>
            Previous
          </button>

          <span>Page {page}</span>

          <button onClick={handleNextPage} disabled={!hasNextPage || loading}>
            Next
          </button>
        </div>
      )}
            
{loading && (
  <div className="loading-container">
    <img
      src={hourglassLoader}
      alt="Loading"
      className="hourglass-loader"
    />
    <p>Searching museum collections...</p>
  </div>
)}

      {errorMessage && <p>{errorMessage}</p>}

      {!loading && <ArtefactList artefacts={artefacts} />}

      {artefacts.length > 0 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={!hasPreviousPage || loading}>
            Previous
          </button>

          <span>Page {page}</span>

          <button onClick={handleNextPage} disabled={!hasNextPage || loading}>
            Next
          </button>
        </div>
      )}

    </main>
  );
}

export default Home;


