import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import "./Auth.css";
import axios from "axios";
import { toast } from "react-toastify";

function Auth({ state, dispatch, setEmail, setName, setPopup }) {
  const [auth, setAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    console.log(state);
  }, [state]);
  function LoginComponent() {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });

    const [errMessage, SetErrMessage] = useState("Welcome Again!");
    const [errClass, setErrClass] = useState(false);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("Signup data:", formData);
      try {
        const res = await axios.post(
          "https://gmap-server.vercel.app/api/login",
          formData
        );

        dispatch(setEmail(res.data.data.email));
        dispatch(setName(res.data.data.username));
        toast(res.data.message);
        setTimeout(() => {
          setAuth(true);
          setShowLogin(false);
        }, [3000]);
      } catch (err) {
        console.log(err.message);
        SetErrMessage(err.message);
        setErrClass(true);
      }
    };

    const LoginClose = () => {
      setShowLogin(false);
      setShowButton(true);
      dispatch(setEmail(""));
      dispatch(setName(""));
      dispatch(setPopup([]));
    };

    return (
      <div
        className={`login-box ${showLogin ? "show" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="icon" onClick={LoginClose}>
          <IoIosClose />
        </div>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input onChange={handleChange} type="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className={errClass ? "err" : "success"}>{errMessage}</p>
      </div>
    );
  }

  function SignupComponent() {
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
    });

    const [errMessage, SetErrMessage] = useState("Welcome To The Portal!");
    const [errClass, setErrClass] = useState(false);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Signup data:", formData);
      try {
        const res = await axios.post(
          "https://gmap-server.vercel.app/api/register",
          formData
        );
        toast(res.data.message);

        setTimeout(() => {
          setShowSignup(false);
          setShowLogin(true);
        }, [3000]);
      } catch (err) {
        console.log(err.message);
        SetErrMessage(err.message);
        setErrClass(true);
      }
    };

    const SignupClose = () => {
      setShowSignup(false);
      setShowButton(true);
    };

    return (
      <div className={`signup-box ${showSignup ? "show" : ""}`}>
        <div onClick={SignupClose}>
          <IoIosClose />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p className={errClass ? "err" : "success"}>{errMessage}</p>
      </div>
    );
  }

  const handleSignup = () => {
    setShowButton(false);
    setShowSignup(true);
  };

  const handleLogin = () => {
    setShowButton(false);
    setShowLogin(true);
  };

  const handleLogout = () => {
    dispatch(setEmail(""));
    dispatch(setName(""));
    setAuth(false);
    setShowButton(true);
  };

  return (
    <div className="auth-container">
      {!auth ? (
        <div className="auth-container-1">
          {showButton && (
            <>
              <button onClick={handleSignup}>SignUp</button>
              <button onClick={handleLogin}>Login</button>
            </>
          )}
          {<SignupComponent />}
          {<LoginComponent />}
        </div>
      ) : (
        <div className="auth-container-1">
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
