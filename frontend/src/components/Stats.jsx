import "./Stats.css";

function Stats({ parsedData }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <h3>Interfaces</h3>
        <h1>{parsedData.interfaces.length}</h1>
      </div>

      <div className="stat-card">
        <h3>VLANs</h3>
        <h1>{parsedData.vlans.length}</h1>
      </div>

      <div className="stat-card">
        <h3>Routing</h3>
        <h1>{parsedData.routing.join(", ")}</h1>
      </div>
    </div>
  );
}

export default Stats;