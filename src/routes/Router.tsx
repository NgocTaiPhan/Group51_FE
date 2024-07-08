import React, {lazy} from "react";
import {useRoutes} from "react-router-dom";
import HomeLayout from "../layout/HomeLayout/HomeLayout";
import ProductDetai from "../pages/ProductDetail/ProductDetail";

import Account from "../pages/Account/Account";
import Login from "../pages/login/Login";
import Regiter from "../pages/register/Register";
import Register from "../pages/register/Register";
import Tracking from "../pages/Tracking/Tracking";

export default function Router() {
    const routing = useRoutes([
        {

            path: "/",
            element: (
                <HomeLayout/>
            ),

        },
        {
            path: "/login",
            element: (
                <Login/>
            )
        },
        {
            path: "/register",
            element: (
                <Register/>
            )
        },
        {
            path: "/",
            element: (
                <HomeLayout/>
            ), children: [
                {
                    path: "/account",
                    element: <Account/>,
                },
            ],
        },
        {
            path: "/",
            element: (
                <HomeLayout/>
            ), children: [
                {
                    path: "/tracking",
                    element: <Tracking/>,
                },
            ],
        }
    ]);
    return routing;
}
