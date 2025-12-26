import React from "react";
import PropTypes from "prop-types";

function CartSummary({ products, onCheckout }) {
  const total = products
    .reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
    .toFixed(2);

  const itemCount = products.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );

  return (
    <div className="cart-summary">
      <h4>Cart Summary</h4>
      <p>Total Items: {itemCount}</p>
      <p className="fw-bold">Total: ${total}</p>
      <button className="btn btn-primary" onClick={onCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
}

CartSummary.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number,
      quantity: PropTypes.number,
    })
  ).isRequired,
  onCheckout: PropTypes.func,
};

CartSummary.defaultProps = {
  onCheckout: () => alert("Checkout functionality coming soon!"),
};

export default CartSummary;
