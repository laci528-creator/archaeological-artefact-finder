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
  const [withImages, setWithImages] = useState(false);
  const [lastWithImages, setLastWithImages] = useState(false);
  const [titleOnly, setTitleOnly] = useState(false);
  const [lastTitleOnly, setLastTitleOnly] = useState(false);

async function loadArtefacts(query, pageNumber, imageFilter, titleFilter) {
  try {
    setLoading(true);
    setErrorMessage("");

    const data = await searchArtefacts(
      query,
      pageNumber,
      20,
      imageFilter,
      titleFilter
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
    setLastWithImages(withImages);
    setLastTitleOnly(titleOnly);

    await loadArtefacts(searchTerm, 1, withImages, titleOnly);
  }

async function handlePreviousPage() {
  if (page > 1) {
    await loadArtefacts(
      lastSearchTerm,
      page - 1,
      lastWithImages,
      lastTitleOnly
    );
  }
}

async function handleNextPage() {
  await loadArtefacts(
    lastSearchTerm,
    page + 1,
    lastWithImages,
    lastTitleOnly
  );
}


  const pagination = artefacts.length > 0 && (
  <div className="pagination">
    <button
      type="button"
      onClick={handlePreviousPage}
      disabled={!hasPreviousPage || loading}
    >
      Previous
    </button>

    <span>Page {page}</span>

    <button
      type="button"
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
      <label className="image-filter">
        <input
          type="checkbox"
          checked={withImages}
          onChange={(event) => setWithImages(event.target.checked)}
        />
        Only show artefacts with images
      </label>

      <fieldset className="search-mode">
        <legend>Search mode</legend>

        <label>
          <input
            type="radio"
            name="searchMode"
            checked={!titleOnly}
            onChange={() => setTitleOnly(false)}
          />
          Broad search
        </label>

        <label>
          <input
            type="radio"
            name="searchMode"
            checked={titleOnly}
            onChange={() => setTitleOnly(true)}
          />
          Title only
        </label>
      </fieldset>

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


