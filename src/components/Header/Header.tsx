import { NavLink, useNavigate } from "react-router-dom";
import "./Header.scss";
import Navbar from "./components/Navbar";
import logo from "../../assets/img/logo.png";
import {
  AudioOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import type { SearchProps } from "antd/es/input/Search";
import { useState } from "react";

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const handleCartToggle = () => {
    if (isCartVisible) {
      navigate(-1); // Quay về trang trước đó khi đóng popup
    }
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="header">
        <div className="header_container">
          <div className="mtw_banner_top_content">
            <a href="#">
              <img src={logo} width="80" height="80" alt="logo" />
            </a>
          </div>
          <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
              style={{ width: 600 }}
          />
          <div className="right_header">
            <UserOutlined
                className="account"
                style={{
                  transition: "all 0.3s",
                  fontSize: 28,
                  marginRight: 30,
                  cursor: "pointer",
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

            <ShoppingCartOutlined
                className="cart"
                style={{
                  transition: "all 0.3s",
                  fontSize: 28,
                  cursor: "pointer",
                }}
            />
          </div>
        </div>
        <Navbar />
      </div>

  );
};

export default Header;
