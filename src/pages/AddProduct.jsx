// Filename - AddProduct.jsx
// Path - src/pages/AddProduct.jsx
// Description - This is the Add Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AddEditCard from "../components/AddEditCard";
import "../styles/styles.css";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    // Fetch categories from API
    fetch("https://fakestoreapi.com/products/categories", {
      signal: controller.signal, // Pass signal to fetch
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Failed to load categories: " + err.message);
        }
      });

    return () => controller.abort(); // Cleanup function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const newProduct = {
      title,
      price,
      description,
      category,
      image: image,
    };

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Product added successfully!");
        setTimeout(() => handleReset(), 1500);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleReset = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
    setImageFile(null);
    setSuccess("");
    setError("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add Product</h1>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}
      <AddEditCard
        title={title}
        setTitle={setTitle}
        onSubmit={handleSubmit}
        price={price}
        setPrice={setPrice}
        description={description}
        setDescription={setDescription}
        category={category}
        setCategory={setCategory}
        categories={categories}
        setImageFile={setImageFile}
        isEditMode={false}
      />
    </div>
  );
}

AddProduct.propTypes = {};

export default AddProduct;
