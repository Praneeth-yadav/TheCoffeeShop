import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyle from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const username = useRef("");
  const password = useRef("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [
    { username: "User", password: "Password" },
    { username: "Praneeth", password: "Password" },
    { username: "Admin", password: "Admin" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username.current.value, " --- ", password.current.value);
    const account = users.find(
      (user) => user.username === username.current.value
    );
    localStorage.setItem("authenticated", true);
    if (account && account.password === password.current.value) {
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate(
        "./dashboard",
        { state: { id: 1, name: username.current.value } },
        { replace: true }
      );
    }
  };
  return (
    <div className={loginStyle.inputform}>
      <p>The Coffee Shop</p>
      <form onSubmit={handleSubmit}>
        <input
          className={loginStyle.btn}
          type="text"
          name="Username"
          ref={username}
          placeholder="Username"
        />
        <input
          className={loginStyle.btn}
          type="password"
          name="Password"
          ref={password}
          placeholder="Password"
        />
        <input className={loginStyle.btn} type="submit" value="Submit" />
      </form>
      <div>
        <a onClick={() => navigate("./newuser", { replace: true })}>New User</a>
      </div>
    </div>
  );
};

export default Login;
