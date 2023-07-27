import { useEffect, useRef, useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import { Items } from "./Items";
import { Navbar } from "./Navbar";

import { IconButton, Input } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Newitem } from "./Newitem";

const Dashboard = () => {
  const response = {
    data: [
      {
        id: "1",
        item: "expresso1",
        desc: "this is a",
        imglocation: "./resources/a.jpeg",
        category: "coffee",
        quantity: "2",
        price: "230",
      },
      {
        id: "2",
        item: "expresso2",
        desc: "this is b",
        imglocation: "./resources/a.jpeg",
        category: "coffee",
        quantity: "2",
        price: "230",
      },
      {
        id: "3",
        item: "expresso3",
        desc: "this is c",
        imglocation: "./resources/a.jpeg",
        category: "coffee",
        quantity: "2",
        price: "230",
      },
      {
        id: "4",
        item: "pastry4",
        desc: "this is c",
        imglocation: "./resources/a.jpeg",
        category: "pastry",
        quantity: "5",
        price: "230",
      },
      {
        id: "5",
        item: "pastry5",
        desc: "this is c",
        imglocation: "./resources/a.jpeg",
        category: "pastry",
        quantity: "6",
        price: "230",
      },
      {
        id: "6",
        item: "savoury2",
        desc: "this is c",
        imglocation: "./resources/a.jpeg",
        category: "savoury",
        quantity: "2",
        price: "230",
      },
    ],
  };
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location data:  ", location);

  const [authenticated, setauthenticated] = useState(null);
  const [search, setsearch] = useState(response.data);
  const [searchval, setsearchval] = useState();

  console.log("Auth ", authenticated);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    console.log("loggedin", location.state.name);

    if (loggedInUser) {
      setauthenticated(loggedInUser);
    } else {
      navigate("/", { replace: true });
    }
  }, [authenticated]);

  function Additem() {
    if (location.state.name == "Admin") {
      return <Newitem />;
    } else return <></>;
  }
  const searchitem = (e) => {
    e.preventDefault();
    console.log("search bar-", e.target.value);
    setsearchval(e.target.value);
    console.log("search val-", searchval);
    const resp1 = response.data.filter((data) => {
      return (data.item || data.category).includes(e.target.value);
    });
    console.log("resp1=", resp1);
    setsearch(resp1);
  };
  function Searchbar() {
    if (location.state.name != "Admin") {
      return (
        <>
          <Input
            //ref={searchval}
            value={searchval}
            onChange={searchitem}
            className={dashboardStyle.search}
            variant="filled"
            placeholder="Search"
            autoFocus
          />
        </>
      );
    }
  }
  return (
    <div className={dashboardStyle.content}>
      <Navbar name={location.state.name} />
      <Additem />
      <Searchbar />
      <div className={dashboardStyle.itemsmod}>
        
        {search.map((data) => {
          // console.log("data=", data.id);
          // console.log("data=", data);
          return (
            <Items
              className={dashboardStyle.item}
              props={data}
              name={location.state.name}
            />
          );
        })}
      </div>
    </div>
  );
};
export default Dashboard;
