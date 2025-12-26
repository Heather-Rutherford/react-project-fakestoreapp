import React from "react";
import PropTypes from "prop-types";

function ErrorMessage({ error }) {
  return <p className="text-center mt-5 text-danger">Error: {error}</p>;
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
