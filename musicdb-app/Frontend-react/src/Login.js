import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function logMeIn() {
    console.log("got into logmein javascript");

    const options = {
      headers: {
        username: username,
        password: password,
      },
    };
    console.log("above axios request");
    axios
      .get("/logMeIn", options)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  return (
    <form>
      <input
        type="text"
        name="username"
        placeholder="username"
        id="username"
        onInput={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        name="password"
        placeholder="password"
        onInput={(e) => setPassword(e.target.value)}
      ></input>
      <input type="submit" onClick={logMeIn}></input>
    </form>
  );
}

export default Login;
