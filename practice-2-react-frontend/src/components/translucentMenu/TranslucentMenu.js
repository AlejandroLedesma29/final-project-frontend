import React, { useState } from "react";
import "./TranslucentMenu.scss";
import FrankBack from "../../assets/images/Frank.png";

export const TranslucentMenu = () => {
    const[menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible((prevState) => !prevState);
    };

  return (
    <div className="navbar-traslucent-styles">
      <nav className={`mask ${ menuVisible ? "visible" : ""}`} >
        <ul className="menu-list">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="menu-hide-navbar " onClick={toggleMenu}>Menu</button>
      </nav>
      <img src={FrankBack}></img>
    </div>
  );
};

export default TranslucentMenu;
