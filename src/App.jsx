import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProductsDetails from "./pages/ProductsDetails.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./pages/Cart.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import ProductListing from "./pages/ProductListing.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/EditProduct/:id" element={<EditProduct />} />
        <Route path="/ProductsDetails">
          <Route path=":id" element={<ProductsDetails />} />
        </Route>
        <Route path="/Cart/1" element={<Cart cartId={1} />} />
      </Routes>
    </>
  );
}

export default App;
