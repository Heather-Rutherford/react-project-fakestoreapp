import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Fake Store Online App
        </Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>
          <Link className="btn btn-outline-light me-2" to="/productsdetails">
            Products Details
          </Link>
          <Link className="btn btn-outline-light" to="/cart">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
