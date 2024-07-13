import React from "react";
import "./navbar.scss";
export default function Navbar() {
  return (
    <nav style={{width:"40%"}}>
      <ul className="header_navbar">
        <li>
          <a href="#">
            <span>Home</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
        <li>
          <a href="#">
            <span>Pages</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
        <li>
          <a href="#">
            <span>Services</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
        <li>
          <a href="#">
            <span>Post Layout</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
        <li>
          <a href="#">
            <span>Blog</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
        <li>
          <a href="#">
            <span>Contact Us</span>
            <i className="fa fa-chevron-down" />
          </a>
        </li>
      </ul>
    </nav>
  );
}
