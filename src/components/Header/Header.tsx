import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import Navbar from "./components/Navbar";
import logo from "../../assets/img/logo.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCart } from "../../pages/ProductDetail/CartContext";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import CartPopUp from "../../pages/cart/CartPopUp";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { cartItemCount } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleToggle = () => {
        setIsVisible(!isVisible);
    };

    const handleCartToggle = () => {
        setIsCartVisible(!isCartVisible);
    };

  return (
    <div className="header">
      <div className="header_container">
        <div className="mtw_banner_top_content" style={{ width: "5%" }}>
          <a href="#">
            <img src={logo} width="80" height="80" alt="logo" />
          </a>
        </div>
        <Navbar />
        <div
          className="flex justify-center items-center"
          style={{ width: "16%" }}
        >
          <LiaPhoneVolumeSolid
            style={{ fontSize: 40, paddingRight: 8, color: "#87c84a" }}
          />
          <div>
            <p style={{marginBottom:0}}>Giao hàng tận nơi</p>
            <p style={{ color: "#87c84a" }}>0902.504.708</p>
          </div>
        </div>
        <div className="right_header">
          <UserOutlined
            className="account"
            style={{
              transition: "all 0.3s",
              fontSize: 28,
              marginRight: 15,
              cursor: "pointer",
              padding: 6,
              borderRadius: "50%",
              backgroundColor: "#e6e6e6",
            }}
            onClick={handleToggle}
          />
          <ul className={`account_option ${isVisible ? "visible" : "hidden"}`}>
            <li>
              <NavLink className="loginPage" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <a className="cartPage" href="#" onClick={handleCartToggle}>
                Cart
              </a>
            </li>
            <li>
              <NavLink className="myAccount" to="/information">
                My Account
              </NavLink>
            </li>
          </ul>
            <NavLink to={"/cart"}>
                <ShoppingCartOutlined
                    className="cart"
                    style={{
                        position: "relative",
                        transition: "all 0.3s",
                        fontSize: 28,
                        marginRight: 15,
                        cursor: "pointer",
                        padding: 6,
                        borderRadius: "50%",
                        backgroundColor: "#e6e6e6",
                    }}

                />

            </NavLink>

          <span className="cart-count">{cartItemCount}</span>
        </div>
      </div>
    </div>
  );

};

export default Header;