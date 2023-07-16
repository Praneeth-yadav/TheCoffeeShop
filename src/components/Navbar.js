import React from "react";
import navbarStyle from "./Navbar.module.css";
import { useHref } from "react-router";
import { Button, ButtonGroup } from "@chakra-ui/react";

export function Navbar({ name }) {
  //   console.log("in nav", { name });
  return (
    <>
      <div className={navbarStyle.nav}>
        <div className={navbarStyle.wel}>
          <a>Welcome {name}</a>
        </div>
        <Button colorScheme="blue" className={navbarStyle.btn1}>
          {" "}
          Menu{" "}
        </Button>
        <Button colorScheme="blue" className={navbarStyle.btn2}>
          {" "}
          Cart{" "}
        </Button>

        <Button colorScheme="blue" className={navbarStyle.btn3}>
          {" "}
          SignOut{" "}
        </Button>
      </div>
    </>
  );
}
