import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import RestaurantDetails from "./components/RestaurantDetails";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import EditProduct from "./components/EditProduct";
import Profile from "./components/Profile";
import CartContext from "./context/CartContext";
import "./App.css";

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem("cartData");
  const parsedCartList = JSON.parse(stringifiedCartList);
  return parsedCartList || [];
};

const App = () => {
  const [cartList, setCartList] = useState(getCartListFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartList));
  }, [cartList]);

  const removeAllCartItems = () => {
    setCartList([]);
  };

  const incrementCartItemQuantity = (id) => {
    setCartList((prevCartList) =>
      prevCartList.map((eachCartItem) =>
        eachCartItem.id === id
          ? { ...eachCartItem, quantity: eachCartItem.quantity + 1 }
          : eachCartItem
      )
    );
  };

  const decrementCartItemQuantity = (id) => {
    setCartList((prevCartList) => {
      const productObject = prevCartList.find(
        (eachCartItem) => eachCartItem.id === id
      );
      if (productObject.quantity > 1) {
        return prevCartList.map((eachCartItem) =>
          eachCartItem.id === id
            ? { ...eachCartItem, quantity: eachCartItem.quantity - 1 }
            : eachCartItem
        );
      }
      return prevCartList.filter((eachCartItem) => eachCartItem.id !== id);
    });
  };

  const removeCartItem = (id) => {
    setCartList((prevCartList) =>
      prevCartList.filter((eachCartItem) => eachCartItem.id !== id)
    );
  };

  const addCartItem = (product) => {
    let isExistingProduct = false;

    setCartList((prevCartList) => {
      const productObject = prevCartList.find(
        (eachCartItem) => eachCartItem.id === product.id
      );
      if (productObject) {
        isExistingProduct = true;
        return prevCartList.map((eachCartItem) =>
          eachCartItem.id === product.id
            ? {
                ...eachCartItem,
                quantity: eachCartItem.quantity + product.quantity,
              }
            : eachCartItem
        );
      }
      return [...prevCartList, product];
    });

    // Toast should be outside so it doesn't run twice in dev
    if (isExistingProduct) {
      toast.info("Product quantity updated successfully");
    } else {
      toast.success("Product added successfully");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      }}
    >
      <Routes>
        <Route exact path="/" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
        <Route exact path="/user-dashboard" element={<UserDashboard />} />
        <Route exact path="/add-product" element={<AddProduct />} />
        <Route exact path="/restaurant/:id" element={<RestaurantDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </CartContext.Provider>
  );
};

export default App;
