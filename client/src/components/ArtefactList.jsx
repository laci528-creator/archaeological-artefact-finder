import ArtefactCard from "./ArtefactCard";

function ArtefactList({ artefacts }) {
  if (!Array.isArray(artefacts)) {
    return <p>No artefacts found.</p>;
  }

  if (artefacts.length === 0) {
    return <p>No artefacts found.</p>;
  }

  return (
    <section className="artefact-grid">
      {artefacts.map((artefact) => (
        <ArtefactCard key={artefact.objectID} artefact={artefact} />
      ))}
    </section>
  );
}

export default ArtefactList;