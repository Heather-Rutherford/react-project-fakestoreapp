// Filename - EditProduct.jsx
// Path - src/pages/EditProduct.jsx
// Description - This is the Edit Product Page Component
// It contains the Form, its Structure
// and Basic Form Functionalities

import "./Styles.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { React, useState } from "react";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
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

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => console.error("Fetch error:", err));
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
      .then((res) => res.json())
      .then((data) => {
        console.log("Product updated:", data);
        alert("Product updated successfully!");
      })
      .catch((err) => console.error(err));
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit}>
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

          <label htmlFor="file">Upload Product Image</label>
          <br />
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button type="reset">Reset</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// export default EditProduct;
export default EditProduct;
