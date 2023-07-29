import { useEffect, useRef, useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import { Items } from "./Items";
import { Navbar } from "./Navbar";

import { IconButton, Input } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Newitem } from "./Newitem";
import axios from "axios";

const Dashboard = () => {
  let response = {
    data: [
      {
        addedBy: "",
        category: "",
        createdDate: "",
        description: "",
        id: 1,
        imglocation: "../resources/loading.jpg",
        item: "Loading....",
        price: null,
        quantity: null,
        updatedDate: "",
      },
    ],
  };
  useEffect(() => {});
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
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/items");
        console.log("result=", res);
        setsearch(res.data);
        console.log("response=", res.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [authenticated, navigate, location.state.name]);

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
          console.log("data=", data.id);
          console.log("data=", data);
          return (
            <Items
              key={data.id}
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
