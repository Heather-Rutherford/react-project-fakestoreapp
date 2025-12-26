import React from "react";
import "../styles/styles.css";

// Home page component to display list of products
// Fetches products from Fake Store API and displays them
// using ProductCard component

// Example API: https://fakestoreapi.com/products
// Each product has id, title, price, description, category,
// image, rating

// Displays products in a grid layout
// Each product is wrapped in a Bootstrap column
// for responsiveness

// Location: src/pages/Home.jsx
function Home() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">
        Welcome to the React Module Project - FakeStoreApp
      </h1>
      <p className="text-left">
        In this project, you will build a FakeStore E-Commerce App using React,
        React Router, and FakeStoreAPI. Your app will allow users to view,
        create, update, and delete products dynamically using API calls. This
        project reinforces state management, API interactions, React Router for
        navigation, and component-based architecture.
      </p>
      <p className="text-left">
        Important Note: FakeStoreAPI is a mock API designed for testing and
        learning purposes. While it will respond positively to POST, PUT, and
        DELETE requests (as if the actions were successful), these changes will
        not actually persist. You’ll still receive a success message and can
        test how your app handles these interactions, but the data will reset or
        remain unchanged when you fetch it again.
      </p>
      <p className="text-left">
        This means that while you can simulate adding, updating, and deleting
        products in your app, the underlying data on FakeStoreAPI will not be
        modified. This is ideal for learning and development, but keep in mind
        that any changes you make will not be saved permanently on the server.
      </p>
      <p className="text-left">
        Thank you for exploring the FakeStoreApp project. Use the navigation bar
        above to start browsing products, adding new items, and managing your
        cart. Enjoy building your React skills with this hands-on e-commerce
        app!
      </p>
    </div>
  );
}

export default Home;
