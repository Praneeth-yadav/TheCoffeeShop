import React from "react";
import navbarStyle from "./Navbar.module.css";

export function Navbar({ name }) {
//   console.log("in nav", { name });
  return (
    <div className={navbarStyle.nav}>
      <a>Welcome {name}</a>
      <button className={navbarStyle.btn}> Menu </button>
      <button className={navbarStyle.btn}> Cart </button>
      <button className={navbarStyle.btn}> Sign-Out </button>
    </div>
  );
}
