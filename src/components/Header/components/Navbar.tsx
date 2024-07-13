import React from "react";
import "./navbar.scss";
export default function Navbar() {
  return (
    <nav style={{width:"40%"}}>
      <ul className="header_navbar">
        <li>
          <a href="#">
            <span>Trang chủ</span>
            <i className="fa fa-chevron-down"/>
          </a>
        </li>
        <li>
          <a href="#">
            <span>Sản phẩm</span>
            <i className="fa fa-chevron-down"/>
          </a>
        </li>
        <li>
          <a href="#">
            <span>Lịch sử mua hàng</span>
            <i className="fa fa-chevron-down"/>
          </a>
        </li>
        <li>
          <a href="#">
            <span>Liên hệ</span>
            <i className="fa fa-chevron-down"/>
          </a>
        </li>

      </ul>
    </nav>
  );
}
