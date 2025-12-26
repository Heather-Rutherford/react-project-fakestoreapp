import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import EmptyCart from "../components/EmptyCart";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";

function Cart({ cartId }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCartProducts() {
      try {
        // Simulate fetching cart data from an API
        const cartResponse = await fetch(
          `https://fakestoreapi.com/carts/${cartId}`,
          { signal: controller.signal }
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

        setProducts(productDetails);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartProducts();
    return () => controller.abort();
  }, [cartId]);

  const handleRemoveFromCart = useCallback((id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    setProducts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQuantity = useCallback(
    (id, newQuantity) => {
      if (newQuantity < 1) {
        handleRemoveFromCart(id);
        return;
      }
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    },
    [handleRemoveFromCart]
  );

  if (isLoading) return <LoadingSpinner message="Loading your cart..." />;
  if (error)
    return <p className="text-center mt-5 text-danger">Error: {error}</p>;

  return (
    <div className="container mt-4">
      <h1>Your Cart</h1>
      {products.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="items-in-cart mb-3">
            <ul className="list-cart">
              {products.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveFromCart}
                />
              ))}
            </ul>
          </div>
          <div className="cart-summary">
            <CartSummary products={products} />
          </div>
        </>
      )}
    </div>
  );
}

Cart.propTypes = {
  cartId: PropTypes.number.isRequired,
};

export default Cart;
