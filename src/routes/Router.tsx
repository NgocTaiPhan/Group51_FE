import React, {lazy} from "react";
import {useRoutes} from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetai from "../pages/ProductDetail/ProductDetail";

import Account from "../pages/Account/Account";
import Login from "../pages/login/Login";
import Regiter from "../pages/register/Register";
import Register from "../pages/register/Register";

export default function Router() {
    const routing = useRoutes([
        {

          path: "/product-detail/:productId",
          element: (
              <ProductDetai />
          ),

        },
        {
          path: "/login",
          element: (
              <Login />
          )
        },
        {
          path: "/register",
          element: (
              <Register />
          )
        }
      ],
    },

  ]);
  return routing;
}
