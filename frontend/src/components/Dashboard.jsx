import "./Dashboard.css";
import Stats from "./Stats";

import HealthCard from "./HealthCard";
import Issues from "./Issues";
import Recommendations from "./Recommendations";
import ParsedData from "./ParsedData";
import Topology from "./Topology";

function Dashboard({ data }) {
  return (
    <div className="dashboard">

      <HealthCard score={data.healthScore} />
      <Stats parsedData={data.parsedData}/>

      <div className="dashboard-grid">

        <Issues issues={data.issues} />

        <Recommendations
          recommendations={data.recommendations}
        />

      </div>

      <ParsedData
        parsedData={data.parsedData}
      />

      <Topology
        topology={data.topology}
      />

    </div>
  );
}

export default Dashboard;