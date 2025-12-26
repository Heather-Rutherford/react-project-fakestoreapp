// Filename - AddEditCard.jsx
// Path - src/components/AddEditCard.jsx
// Description - This is the Add/Edit Product Form Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";

function AddEditCard({
  title,
  setTitle,
  onSubmit,
  price,
  setPrice,
  description,
  setDescription,
  category,
  setCategory,
  categories,
  setImageFile,
  isEditMode,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="title" className="label">
          Product Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter product title"
          required
        />

        <label htmlFor="price" className="label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter the product price"
          required
          min="0"
          step="0.01"
        />

        <label htmlFor="description" className="label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a product description"
          required
        />

        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          className="form-control"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor="file" className="label">
          Upload Product Image
        </label>
        <input
          type="file"
          name="file"
          id="file"
          className="form-control"
          onChange={(e) => setImageFile(e.target.files[0])}
          accept="image/*"
        />
        <div className="button-group mt-3">
          <button type="reset" className="btn btn-secondary">
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditMode ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}

AddEditCard.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setPrice: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setImageFile: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default AddEditCard;
