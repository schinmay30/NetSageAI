import "./Recommendations.css";

function Recommendations({ recommendations }) {
  return (
    <div className="recommendation-panel">
      <h2>Recommendations</h2>

      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>✅ {recommendation}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;