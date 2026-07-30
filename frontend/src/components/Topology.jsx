import "./Topology.css";

function Topology() {

  return (

    <div className="topology-card">

      <h2>Network Topology</h2>

      <div className="topology-placeholder">

        <div className="device">
          Router
        </div>

        <div className="line"></div>

        <div className="device">
          Switch
        </div>

        <div className="line"></div>

        <div className="device">
          PC
        </div>

      </div>

    </div>

  );

}

export default Topology;