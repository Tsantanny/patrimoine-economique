import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="nav-bar">
      <div className="container">
        <h3>Patrimoine</h3>
        <div>
          <Link to="/patrimoine">Patrimoine</Link>
          <Link to="/possession">Possession</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
