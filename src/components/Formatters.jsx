// src/utils/formatters.js
export const formatPrice = (price) => {
  return price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
