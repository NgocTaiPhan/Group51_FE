import React, { useState, useEffect } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Tracking from "../pages/Tracking/Tracking";
import Account from "../pages/Account/Account";
import Product from "../pages/product/Product";
import Cart from "../pages/cart/Cart";
import Order from "../pages/order/Order";
import OrderDetails from "../pages/order/OrderDetails";
import Home from "../pages/Home/Home";

export default function Router() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/cart") {
      setIsCartVisible(true);
    } else {
      setIsCartVisible(false);
    }

    // eslint-disable-next-line no-restricted-globals
  }, [location.pathname]);
  useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/product-detail/:productId",
          element: <ProductDetail />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/account",
          element: <Account />,
        },
        {
          path: "/product",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/order",
          element: <Order />,
        },

        {
          path: "/orderDetail",
          element: <OrderDetails />,
        },

        {
          path: "/",
          element: <HomeLayout />,
          children: [
            {
              path: "/tracking",
              element: <Tracking />,
            },
          ],
        },
      ],
    },
  ]);
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/orderDetail" element={<OrderDetails />} />
        <Route path="/account" element={<Account />} />
        <Route path="/product" element={<Product />} />
      </Route>
    </Routes>
  );
}
