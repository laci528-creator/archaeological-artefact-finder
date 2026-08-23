function About() {
  return (
    <main className="about-page">
      <h1>About this project</h1>

      <section className="about-section">
        <h2>Archaeological Artefact Finder</h2>

        <p>
          Archaeological Artefact Finder is a full-stack web application for
          exploring archaeological and historical objects from the collection
          of The Metropolitan Museum of Art.
        </p>

        <p>
          The project combines my interest in archaeology with modern web
          development technologies such as React, Node.js, Express and MySQL.
        </p>
      </section>

      <section className="about-section">
        <h2>Search and research</h2>

        <p>
          Users can search the museum collection, browse paginated results and
          open detailed information about individual objects.
        </p>

        <p>
          Records without images are intentionally included in the search
          results. Archaeological and historical metadata can still be valuable
          for research even when no digital image is available.
        </p>

        <p>
          When an object has no available image, the application displays a
          placeholder while keeping the available metadata accessible.
        </p>
      </section>

      <section className="about-section">
        <h2>Favorites and notes</h2>

        <p>
          Selected artefacts can be saved as favorites in a MySQL database.
          Users can also add personal notes to saved objects and remove
          favorites when they are no longer needed.
        </p>

        <p>
          This feature demonstrates communication between the React frontend,
          the Express backend and a relational database.
        </p>
      </section>

      <section className="about-section">
        <h2>Application features</h2>

        <ul>
          <li>Search objects from The Metropolitan Museum of Art Collection API</li>
          <li>Paginated search results</li>
          <li>Detailed object information</li>
          <li>Support for records without images</li>
          <li>Save and delete favorite artefacts</li>
          <li>Add personal notes to favorites</li>
          <li>Search state preserved when returning from object details</li>
          <li>Loading and error handling for external API requests</li>
          <li>Responsive user interface</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>External API</h2>

        <p>
          Object data is provided by The Metropolitan Museum of Art Collection
          API. A custom Node.js and Express backend handles communication with
          the external API and processes the data before it is returned to the
          frontend.
        </p>

        <p>
          Because external museum data can occasionally be incomplete or
          unavailable, the application includes fallback values and error
          handling for missing records, images and metadata.
        </p>
      </section>

      <section className="about-section">
        <h2>Local installation</h2>

        <p>Clone the repository:</p>

        <pre>
          <code>
{`git clone https://github.com/laci528-creator/archaeological-artefact-finder.git
cd archaeological-artefact-finder`}
          </code>
        </pre>

        <p>
          Install the project dependencies and configure the environment
          variables using the provided <code>.env.example</code> files.
        </p>

        <p>
          After the client, server and database have been configured, the
          frontend and backend can be started together from the project root:
        </p>

        <pre>
          <code>
{`npm run dev`}
          </code>
        </pre>

        <p>
          Detailed setup instructions are available in the project README.
        </p>
      </section>

      <section className="about-section">
        <h2>Technologies</h2>

        <ul>
          <li>React</li>
          <li>Vite</li>
          <li>React Router</li>
          <li>Node.js</li>
          <li>Express.js</li>
          <li>MySQL</li>
          <li>The Metropolitan Museum of Art Collection API</li>
          <li>JavaScript</li>
          <li>HTML5</li>
          <li>CSS3</li>
          <li>Concurrently</li>
        </ul>
      </section>
    </main>
  );
}

export default About;