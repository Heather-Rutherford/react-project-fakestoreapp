import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductsDetails from "./pages/ProductsDetails.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductsDetails">
          {" "}
          <Route path=":id" element={<ProductsDetails />} />
        </Route>
        <Route path="/Cart" element={<div>Cart Page</div>} />
      </Routes>
    </>
  );
}

export default App;
