import { Link } from "react-router-dom";

function HeaderPatrimoine() {
  return (
    <header className="nav-bar-patrimoine">
      <div className="wrapper">
        <h3>Patrimoine</h3>
        <div>
          <Link to="/patrimoine">Patrimoine</Link>
          <Link to="/possession">Possession</Link>
        </div>
      </div>
    </header>
  );
}
export default HeaderPatrimoine;
