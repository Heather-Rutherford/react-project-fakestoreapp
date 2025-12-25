import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          FakeStoreApp
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/AddProduct">
                Add Product
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Productlisting">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Cart/1">
                Cart
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
