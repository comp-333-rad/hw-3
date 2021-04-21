import React, { useState } from "react";
import logo from "./logo.svg";
import LoginForm from "./components/LoginForm";
import "./App.css";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [loginOrReg, setLoginOrReg] = useState("login");
  const [isLoggedIn, setLoginStatus] = useState(false);

  axios.get("/checkLogin").then((response) => {
    if (response["data"] == true) {
      props.setLoggedIn(true);
      console.log("LOGGED IN");
    }
    console.log(response);
  });
  

  function logMeIn() {
    console.log("got into logmein javascript");

    const options = {
      headers: {
        username: username,
        password: password,
      },
    };
    console.log("above axios request");
    axios.get("/logMeIn", options).then((response) => {
      if (response["data"]["loggedIn"] == true) {
        props.setLoggedIn(true);
        console.log("LOGGED IN");
      } else {
        setErrorStatus(true);
      }
      console.log(response);
    });
  }
  function register() {
    const options = {
      headers: {
        username: username,
        email: email,
        password: password,
      },
    };
    console.log("above axios request");
    axios.get("/createUser", options).then((response) => {
      if (response["data"] == true) {
        setLoginOrReg("login");
        setErrorStatus(false);
      } else {
        setErrorStatus(true);
      }
      console.log(response["data"]);
    });
  }
  return (
    <>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        setEmail={setEmail}
        setLoginOrReg={setLoginOrReg}
        username={username}
        password={password}
        email={email}
        loginOrReg={loginOrReg}
        logMeIn={logMeIn}
        register={register}
        errorStatus={errorStatus}
      />
    </>
  );
}

export default Login;
