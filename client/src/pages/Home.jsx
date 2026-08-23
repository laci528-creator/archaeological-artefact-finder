import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import ArtefactList from "../components/ArtefactList";
import { searchArtefacts } from "../services/api";
import hourglassLoader from "../assets/hourglass-loader.png";

function getSavedSearchState() {
  try {
    const savedState = sessionStorage.getItem("artefactSearchState");

    return savedState ? JSON.parse(savedState) : null;
  } catch {
    return null;
  }
}

function Home() {
const savedState = getSavedSearchState();
const [searchTerm, setSearchTerm] = useState(
  savedState?.searchTerm || ""
);

const [lastSearchTerm, setLastSearchTerm] = useState(
  savedState?.lastSearchTerm || ""
);

const [artefacts, setArtefacts] = useState(
  savedState?.artefacts || []
);

const [page, setPage] = useState(
  savedState?.page || 1
);

const [hasPreviousPage, setHasPreviousPage] = useState(
  savedState?.hasPreviousPage || false
);

const [hasNextPage, setHasNextPage] = useState(
  savedState?.hasNextPage || false
);

const [totalObjectIDs, setTotalObjectIDs] = useState(
  savedState?.totalObjectIDs || 0
);

const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  if (!lastSearchTerm) {
    return;
  }

  const searchState = {
    searchTerm,
    lastSearchTerm,
    artefacts,
    page,
    hasPreviousPage,
    hasNextPage,
    totalObjectIDs,
  };

  sessionStorage.setItem(
    "artefactSearchState",
    JSON.stringify(searchState)
  );
}, [
  searchTerm,
  lastSearchTerm,
  artefacts,
  page,
  hasPreviousPage,
  hasNextPage,
  totalObjectIDs,
]);

async function loadArtefacts(query, pageNumber) {
  try {
    setLoading(true);
    setErrorMessage("");

    const data = await searchArtefacts(
      query,
      pageNumber,
      20
    );

    //console.log("Backend response:", data);

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
    await loadArtefacts(
      lastSearchTerm,
      page - 1,
    );
  }
}

async function handleNextPage() {
  await loadArtefacts(
    lastSearchTerm,
    page + 1,
  );
}


  const pagination = artefacts.length > 0 && (
  <div className="pagination">
    <button
      type="button"
      className="button button-secondary"
      onClick={handlePreviousPage}
      disabled={!hasPreviousPage || loading}
    >
      Previous
    </button>

    <span>Page {page}</span>

    <button
      type="button"
      className="button button-secondary"
      onClick={handleNextPage}
      disabled={!hasNextPage || loading}
    >
      Next
    </button>
  </div>
);



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

      {pagination}
            
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

      {pagination}

    </main>
  );
}

export default Home;


