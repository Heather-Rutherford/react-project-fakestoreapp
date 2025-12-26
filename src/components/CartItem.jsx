import React from "react";
import PropTypes from "prop-types";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const subtotal = ((item.price || 0) * (item.quantity || 1)).toFixed(2);

  return (
    <li className="cart-item">
      <h5>{item.title || `Product ID: ${item.id || item.productId}`}</h5>
      <img
        src={item.image || "https://placehold.co/150"}
        alt={item.title || "Product"}
        style={{ height: "150px", objectFit: "contain" }}
        onError={(e) => {
          e.target.src = "https://placehold.co/150"; // Fallback image
        }}
      />
      <p>Quantity: {item.quantity || 1}</p>
      <p>Price: ${item.price || "0.00"}</p>
      <p>Subtotal: ${subtotal || "0.00"}</p>

      <div className="cart-item-buttons">
        <button
          className="btn btn-danger mt-3"
          onClick={() => onRemove(item.id)}
        >
          Delete
        </button>
        <button
          className="btn btn-success mt-3"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="btn btn-warning mt-3"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    productId: PropTypes.number,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
