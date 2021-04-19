import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function Login(props) {
  return (
    <form>
      <input
        type="text"
        name="username"
        placeholder="username"
        id="username"
      ></input>
      <input type="text" name="password" placeholder="password"></input>
      <input type="submit" onclick="logMeIn()"></input>
    </form>
  );
}

function logMeIn() {
  const options = {
    headers: {
      username: document.getElementById("username").value(),
      password: document.getElementById("password").value(),
    },
  };
  axios.post("/logMeIn", options);
}

export default Login;
