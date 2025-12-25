import React, { useState, useEffect } from "react";
import "./Styles.css";

function Cart({ cartId }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchCartProducts() {
      try {
        // Simulate fetching cart data from an API
        const cartResponse = await fetch(
          `https://fakestoreapi.com/carts/${cartId}`
        );
        if (!cartResponse.ok) throw new Error("Failed to fetch cart.");
        const cartData = await cartResponse.json();

        // Extract product IDs and Quantities from cart data
        const productDetails = await Promise.all(
          cartData.products.map(async (item) => {
            const productResponse = await fetch(
              `https://fakestoreapi.com/products/${item.productId}`
            );
            if (!productResponse.ok)
              throw new Error(
                `Failed to fetch product details for ${item.productId}.`
              );
            const productData = await productResponse.json();
            return { ...productData, quantity: item.quantity };
          })
        );

        console.log("Fetched Cart Products:", productDetails);
        setProducts(productDetails);
        // const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // setCart(storedCart);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartProducts();
  }, [cartId]);

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      // Prevent quantity less than 1
      handleRemoveFromCart(id);
      return;
    }
    const updatedProducts = products.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setProducts(updatedProducts);
    // setCart(updatedCart); // triggers re-render
    // localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (id) => {
    const updatedProducts = products.filter((item) => item.id !== id);
    setProducts(updatedProducts); // triggers re-render
    // localStorage.setItem("cart", JSON.stringify(updatedProducts));
    alert("Product removed from cart!");
  };

  if (!cart) return <p className="text-center mt-5">Loading...</p>;
  if (error)
    return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return (
    // <div className="container mt-4">
    //   <h1>Your Cart</h1>
    //   <p>Cart functionality is currently under development.</p>
    // </div>
    <div className="container mt-4">
      <h1>Your Cart</h1>
      <ul className="list-cart">
        {products.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          products.map((item) => (
            <li key={item.id}>
              {item.title
                ? `Product: ${item.title}`
                : `Product ID: ${item.id || item.productId}`}
              {<br />}
              <img
                src={item.image}
                alt={item.title}
                style={{ height: "150px", objectFit: "contain" }}
              />
              {<br />}
              <p>Quantity: {item.quantity || 1}</p>
              <p>Price: ${item.price}</p>
              <p>
                Subtotal: $
                {((item.price || 0) * (item.quantity || 1)).toFixed(2)}
              </p>
              <button
                className="btn btn-danger mt-3"
                onClick={() => handleRemoveFromCart(item.id)}
              >
                Delete
              </button>{" "}
              <button
                className="btn btn-success mt-3"
                onClick={() =>
                  handleUpdateQuantity(item.id, (item.quantity || 1) + 1)
                }
              >
                +
              </button>{" "}
              <button
                className="btn btn-warning mt-3"
                onClick={() =>
                  handleUpdateQuantity(item.id, (item.quantity || 1) - 1)
                }
                // disabled={(item.quantity || 1) <= 1}
              >
                -
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Cart;
