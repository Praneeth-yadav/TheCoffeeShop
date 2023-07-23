import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import navbarStyle from "./Navbar.module.css";

export function Navbar({ name }) {
  const navigate = useNavigate();
  console.log("in nav", name);
  return (
    <>
      <div className={navbarStyle.nav}>
        <div className={navbarStyle.wel}>
          <a>Welcome {name}</a>
        </div>
        <Button
          colorScheme="blue"
          className={navbarStyle.btn1}
          onClick={() => {
            navigate(
              "/dashboard",
              { state: { id: 1, name: name } },
              { replace: true }
            );
          }}
        >
          {" "}
          Menu{" "}
        </Button>
        <Button
          colorScheme="blue"
          className={navbarStyle.btn2}
          onClick={() => {
            navigate(
              "/cartpage",
              { state: { id: 1, name: name } },
              { replace: true }
            );
          }}
        >
          {" "}
          Cart{" "}
        </Button>

        <Button
          colorScheme="blue"
          className={navbarStyle.btn3}
          onClick={() => {
            navigate("/", { replace: true });
          }}
        >
          {" "}
          SignOut{" "}
        </Button>
      </div>
    </>
  );
}
