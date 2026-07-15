function About() {
  return (
    <main className="about-page">
      <h1>About this project</h1>

      <section className="about-section">
        <h2>Archaeological Artefact Finder</h2>
        <p>
          Archaeological Artefact Finder is a full-stack portfolio project for
          exploring archaeological and historical objects from the Metropolitan
          Museum of Art Collection API.
        </p>

        <p>
          The goal of the project is to combine my interest in archaeology with
          modern web development technologies such as React, Node.js and
          Express.
        </p>
      </section>

      <section className="about-section">
        <h2>Live demo</h2>
        <p>
          The live demo allows users to search museum collections, browse
          paginated results, view object details and explore artefacts in a
          responsive user interface.
        </p>

        <p>
          The application uses a custom backend to communicate with the external
          museum API and includes basic error handling for incomplete or
          unavailable object data.
        </p>
      </section>

      <section className="about-section">
        <h2>Favorites feature</h2>
        <p>
          A favorites feature with MySQL database support is planned as a local
          full-stack version of the project. This feature allows users to save
          selected artefacts and add personal notes.
        </p>

        <p>
          Because the live demo currently runs without a public database, users
          who want to test the favorites feature can clone the project and run
          it locally.
        </p>
      </section>

      <section className="about-section">
        <h2>Local installation</h2>

        <p>Clone the repository:</p>

        <pre>
          <code>
{`git clone https://github.com/laci528-creator/archaeological-artefact-finder.git`}
          </code>
        </pre>

        <p>Install and start the backend:</p>

        <pre>
          <code>
{`cd server
npm install
npm run dev`}
          </code>
        </pre>

        <p>Install and start the frontend:</p>

        <pre>
          <code>
{`cd client
npm install
npm run dev`}
          </code>
        </pre>

        <p>
          The frontend runs on <strong>http://localhost:5173</strong> and the
          backend runs on <strong>http://localhost:5000</strong>.
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
          <li>The Metropolitan Museum of Art Collection API</li>
          <li>MySQL planned for the favorites version</li>
        </ul>
      </section>
    </main>
  );
}

export default About;