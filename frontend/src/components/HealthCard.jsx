import "./HealthCard.css";

function HealthCard({ score }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let color = "#22c55e";
  let status = "Excellent";

  if (score < 90) {
    color = "#eab308";
    status = "Good";
  }

  if (score < 75) {
    color = "#f97316";
    status = "Average";
  }

  if (score < 50) {
    color = "#ef4444";
    status = "Critical";
  }

  return (
    <div className="health-card">

      <h2>Network Health</h2>

      <div className="progress-ring">

        <svg width="180" height="180">

          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="12"
            fill="none"
          />

          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 90 90)"
          />

        </svg>

        <div className="score">

          <h1>{score}%</h1>

          <span>{status}</span>

        </div>

      </div>

    </div>
  );
}

export default HealthCard;