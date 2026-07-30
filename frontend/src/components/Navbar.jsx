import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🌐</span>
        <h2>NetSageAI</h2>
      </div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">About</a></li>
      </ul>

      <button className="nav-btn">
        Analyze Network
      </button>
    </nav>
  );
}

export default Navbar;