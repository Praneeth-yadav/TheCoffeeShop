import { useEffect, useState } from "react";
import dashboardStyle from "./Dashboard.module.css";
import { Navbar } from "./Navbar";

import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = (state) => {
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

  return (
    <>
      {/* <div>
        <p className={dashboardStyle.texthead}>Welcome to your Dashboard</p>
      </div> */}
      <Navbar name={location.state.name} />
    </>
  );
};
export default Dashboard;
