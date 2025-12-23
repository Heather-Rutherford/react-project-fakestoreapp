import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductsDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

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
          <h4>${product.price}</h4>
          <button className="btn btn-success mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;
