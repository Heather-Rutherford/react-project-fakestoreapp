import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddToCart = () => {
    // Get current cart from localStorage or initialize as empty array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Add current product
    cart.push(product);
    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "300px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <b>Category:</b> {product.category}
          </p>
          <h4>
            $
            {product.price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}
          </h4>
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

export default ProductsDetails;
