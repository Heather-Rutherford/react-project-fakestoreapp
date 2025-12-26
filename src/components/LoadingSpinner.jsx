import React from "react";
import PropTypes from "prop-types";

function LoadingSpinner({ message = "Loading..." }) {
  return <p className="text-center mt-5">{message}</p>;
}

LoadingSpinner.propTypes = {
  message: PropTypes.string,
};

export default LoadingSpinner;
