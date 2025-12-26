import React from "react";
import PropTypes from "prop-types";

function QuantityControl({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control">
      <button className="btn btn-warning" onClick={onDecrease}>
        -
      </button>
      <span className="mx-2">{quantity}</span>
      <button className="btn btn-success" onClick={onIncrease}>
        +
      </button>
    </div>
  );
}

QuantityControl.propTypes = {
  quantity: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

export default QuantityControl;
