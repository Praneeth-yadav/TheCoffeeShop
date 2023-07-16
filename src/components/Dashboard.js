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
      },
      {
        id: "2",
        item: "expresso2",
        desc: "this is b",
        imglocation: "./resources/a.jpeg",
      },
      {
        id: "3",
        item: "expresso3",
        desc: "this is c",
        imglocation: "./resources/a.jpeg",
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
  }, []);
  console.log("response", response.data[0]);
  const row = [];
  for (let i = 1; i < 4; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    row.push(
      <Items className={dashboardStyle.item} props={response.data[{ i }]} />
    );
  }
  return (
    <div  className={dashboardStyle.content}>
      <Navbar name={location.state.name} />
      <div className={dashboardStyle.itemsmod}>
        <Items className={dashboardStyle.item} props={response.data[0]} />
        <Items className={dashboardStyle.item} props={response.data[0]} />

        <Items className={dashboardStyle.item} props={response.data[0]} />

        <Items className={dashboardStyle.item} props={response.data[0]} />
        <Items className={dashboardStyle.item} props={response.data[0]} />
        <Items className={dashboardStyle.item} props={response.data[0]} />

        <Items className={dashboardStyle.item} props={response.data[0]} />

        <Items className={dashboardStyle.item} props={response.data[0]} />
      </div>
    </div>
  );
};
export default Dashboard;
