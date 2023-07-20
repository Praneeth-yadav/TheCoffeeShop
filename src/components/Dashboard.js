import { useEffect, useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import { Navbar } from "./Navbar";
import { Items } from "./Items";

import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = (state) => {
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
  console.log("State:  ", location.state.name);

  const [authenticated, setauthenticated] = useState(null);
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
  return (
    <div className={dashboardStyle.content}>
      <Navbar name={location.state.name} />
      <div className={dashboardStyle.itemsmod}>
        {response.data.map((data) => {
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
