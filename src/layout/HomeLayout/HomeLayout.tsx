import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Login from "../../components/login/Login";

export default function HomeLayout() {
  return (
    <div>
        {/*< Login />*/}
        <Header />
          <Outlet/>
        <Footer />
    </div>
  )
}
