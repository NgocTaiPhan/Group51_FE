import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Cart from "../pages/cart/Cart";
import Account from "../pages/Account/Account";
import Product from "../pages/product/Product";

export default function Router() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/cart" || pathname === "/carts") {
      setIsCartVisible(true);
    } else {
      setIsCartVisible(false);
    }
  }, []);

  return (
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route path="/product-detail/:productId" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/product" element={<Product />} />
        </Route>
      </Routes>
  );
}
