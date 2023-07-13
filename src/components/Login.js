import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginStyle from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [
    { username: "User", password: "Password" },
    { username: "Praneeth", password: "Password" },
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, " --- ", password);
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate(
        "./dashboard",
        { state: { id: 1, name: username } },
        { replace: true }
      );
    }
  };
  return (
    <div className={loginStyle.inputform}>
      <p>Welcome Back</p>
      <form onSubmit={handleSubmit}>
        <input
          className={loginStyle.btn}
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className={loginStyle.btn}
          type="password"
          name="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input className={loginStyle.btn} type="submit" value="Submit" />
      </form>
      <div>
        <a onClick={() => navigate("./newUser", { replace: true })}>New User</a>
      </div>
    </div>
  );
};

export default Login;
