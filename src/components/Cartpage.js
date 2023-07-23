import { Navbar } from "./Navbar";

import { useLocation } from "react-router-dom";
const Cartpage = () => {
  const location = useLocation();
  console.log("state in cart", location);
  return (
    <>
      <Navbar name={location.state.name} />
      <div>
        <h1>Cart page</h1>
      </div>
    </>
  );
};
export default Cartpage;
