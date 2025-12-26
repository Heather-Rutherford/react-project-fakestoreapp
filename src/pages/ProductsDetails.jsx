import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load product: " + err.message);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    // Get current cart from localStorage or initialize as empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add current product
    cart.push(product);
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    setSuccess("Product added to cart!");
  };

  const formatPrice = (price) => {
    return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (isLoading) return <LoadingSpinner message="Loading products..." />;

  return (
    <div className="container mt-4">
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "300px", objectFit: "contain" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/300";
            }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <b>Category:</b> {product.category}
          </p>
          <h4>${formatPrice(product.price)}</h4>
          <button className="btn btn-success mt-3" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <Link
            to={`/EditProduct/${product.id}`}
            className="btn btn-primary mt-auto"
          >
            Edit Product
          </Link>
        </div>
      </div>
    </div>
  );
}

ProductsDetails.propTypes = {};

export default ProductsDetails;
