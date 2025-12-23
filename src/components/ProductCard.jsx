import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card h-100">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "250px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text fw-bold">${product.price}</p>
        <Link
          to={`/ProductsDetails/${product.id}`}
          className="btn btn-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
