import React, { lazy } from "react";
import { useRoutes } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetai from "../pages/ProductDetail/ProductDetail";
import Login from "../components/login/Login";
export default function Router() {
  const routing = useRoutes([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/product-detail/:productId",
          element: (
              <ProductDetai />
          ),
        },
      ],
    },
  ]);
  return routing;
}
