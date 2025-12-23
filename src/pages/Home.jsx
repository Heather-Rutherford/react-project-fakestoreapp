import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

// Home page component to display list of products
// Fetches products from Fake Store API and displays them
// using ProductCard component

// Example API: https://fakestoreapi.com/products
// Each product has id, title, price, description, category,
// image, rating

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/pages/Home.jsx
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
