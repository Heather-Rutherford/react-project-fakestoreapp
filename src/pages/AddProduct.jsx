// Filename - AddProduct.jsx
// Path - src/pages/AddProduct.jsx
// Description - This is the Add Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import "./Styles.css";
import React, { useState, useEffect } from "react";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    // Fetch categories from API
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      .then((data) => {
        console.log(data);
        alert("Product added successfully!");
        handleReset();
      })
      .catch((err) => console.error("POST error:", err));
  };

  const handleReset = () => {
    setTitle("");
    setPrice("");
    setDescription("");
    setCategory("");
    setImage("");
    setImageFile(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Add New Product</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
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
          <label htmlFor="price" className="form-label">
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
          />
          <label htmlFor="description" className="form-label">
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
          <label htmlFor="category" className="form-label">
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
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label htmlFor="file">Upload Product Image*</label>
          <input
            type="file"
            name="file"
            id="file"
            // onChange={(e) => setImageFile(e.target.files[0])}
            placeholder="Enter Upload File"
            required
          />
          <p />
          <button type="reset" value="reset" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" value="Submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// export default AddProduct;
export default AddProduct;
