// Filename - EditProduct.jsx
// Path - src/pages/EditProduct.jsx
// Description - This is the Edit Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import AddEditCard from "../components/AddEditCard";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/styles.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://fakestoreapi.com/products/categories", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Error fetching categories: " + err.message);
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://fakestoreapi.com/products/${id}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Fetch error: " + err.message);
        }
      });
    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let imageData = image;
    if (imageFile) {
      // Convert image file to base64 string
      imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    }

    const updatedProduct = {
      title,
      price,
      description,
      category,
      image: imageData,
    };

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        setSuccess("Product updated successfully!");
        setTimeout(() => navigate("/ProductListing"), 1500);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (isLoading || !product)
    return <LoadingSpinner message="Loading product..." />;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Product</h1>
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
        isEditMode={true}
      />
    </div>
  );
}

EditProduct.propTypes = {};
export default EditProduct;
