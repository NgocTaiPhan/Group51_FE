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
import { useCart } from "../../pages/ProductDetail/CartContext";
import {Link} from "react-router-dom";




const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

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
          <div className="mtw_banner_top_content">
            <a href="#">
              <img src={logo} width="80" height="80" alt="logo" />
            </a>
          </div>
            <Navbar />
          <Search
              placeholder="Điền tên sản phẩm"
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
                  <Link to={"/cart"}><a className="cartPage" href="" onClick={handleCartToggle}>
                      Cart
                  </a></Link>

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
                    transition: "all 0.3s",
                    fontSize: 28,
                    cursor: "pointer",
                    color: "white"
                }}
            /></NavLink>

            <span className="cart-count">{cartItemCount}</span>
          </div>

        </div>

      </div>

  );
};

export default Header;
