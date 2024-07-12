import React from "react";
import "./footer.scss";
import logo from "../../assets/img/logo.png";
import footer from "../../assets/img/_images_icons_payment.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faPinterest,
  faSquareInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_content">
        <div className="footer_item">
          <div className="icon_footer">
            <FontAwesomeIcon className="icon" icon={faFacebook} />
            <FontAwesomeIcon className="icon" icon={faSquareInstagram} />
            <FontAwesomeIcon className="icon" icon={faSquareTwitter} />
            <FontAwesomeIcon className="icon" icon={faPinterest} />
          </div>
        </div>
        <div className="footer_item">
          <h3>INFORMATION</h3>
          <ul>
            <li>About Us</li>
            <li>Checkout</li>
            <li>Contact</li>
            <li>Surivius</li>
          </ul>
        </div>
        <div className="footer_item">
          <h3>MY ACCOUNT</h3>
          <ul>
            <li>My account</li>
            <li>Contact</li>
            <li>Shopping Cart</li>
            <li>Shop</li>
          </ul>
        </div>
        <div className="footer_item">
          <h3>QUICK SHOP</h3>
          <ul>
            <li>Shipping & Return</li>
            <li>Contact</li>
            <li>Secure Shopping</li>
            <li>Affiliates</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
