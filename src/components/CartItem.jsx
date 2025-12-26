import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "./Formatters";

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const subtotal = formatPrice((item.price || 0) * (item.quantity || 1));

  return (
    <li className="cart-item">
      <img
        src={item.image || "https://placehold.co/150"}
        alt={item.title || "Product"}
        style={{ height: "150px", objectFit: "contain" }}
        onError={(e) => {
          e.target.onerror = null; // Disable error handler first
          e.target.src = "https://placehold.co/150";
        }}
      />
      <p className="product-title">
        {item.title || `Product ID: ${item.id || item.productId}`}
      </p>
      <div className="cart-item-buttons">
        <button
          className="btn btn-warning mt-3"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </button>
        Quantity: {item.quantity || 1}
        <button
          className="btn btn-success mt-3"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </button>
        <button
          className="btn btn-danger mt-3"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.title || "product"} from cart`}
        >
          Delete
        </button>
      </div>
      <div className="cart-item-price">
        <p>
          Price: ${formatPrice(item.price)}
          <br />
          Subtotal: ${subtotal || "0.00"}
        </p>
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
