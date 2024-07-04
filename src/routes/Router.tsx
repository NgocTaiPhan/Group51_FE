import React, { lazy, useState } from "react";
import { useRoutes, NavLink, useLocation } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import CartPopUp from "../pages/cart/CartPopUp";
import Cart from "../pages/cart/Cart";
import Account from "../pages/Account/Account";

export default function Router() {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/cart") {
      setIsCartVisible(true);
    } else {
      setIsCartVisible(false);
    }
  }, [location.pathname]);

  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
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
          path: "/cart",
          element: <></>, // Empty component for routing
        },
        {
          path: "/carts",
          element: <Cart  />,
        },
        {
          path: "/account",
          element: <Account />,
        },

      ],
    },
  ]);

  return (
      <>
        {routing}
        <CartPopUp visible={isCartVisible} onClose={() => setIsCartVisible(false)} />
      </>
  );
}
