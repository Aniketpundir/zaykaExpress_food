import React, { useState, useContext, useEffect } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setForLoginToken, setToken } = useContext(Storecontext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setForLoginToken(token);
      setShowLogin(false);
    }
  }, []);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      currState === "Login"
        ? "/api/user/login"
        : "/api/user/register";

    try {
      const res = await axios.post(url + endpoint, data);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setForLoginToken(res.data.token);
        setShowLogin(false);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Server error");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={onSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-input">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currState === "Login" ? "Login" : "Create Account"}
        </button>

        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
