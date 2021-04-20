import React, { useState } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";

function LoginForm(props) {
  function formPreventDefault(event) {
    event.preventDefault();
  }
  console.log("rerendering entrance form");
  if (props.loginOrReg == "login") {
    return (
      <div className="loginPage text-center" key={"loginForm"}>
        <h1 className="text-white">
          Please login here with an existing username, or click
          <span
            className="text-red-700"
            onClick={() => props.setLoginOrReg("register")}
          >
            {" "}
            here
          </span>{" "}
          to register
        </h1>
        <form onSubmit={formPreventDefault}>
          <input
            type="text"
            name="username"
            placeholder="username"
            id="username"
            onInput={(e) => props.setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onInput={(e) => props.setPassword(e.target.value)}
          ></input>
          <input type="submit" onClick={props.logMeIn}></input>
        </form>
        <ErrorMessage errorStatus={props.errorStatus} />
      </div>
    );
  } else {
    return (
      <div className="registerPage text-center" key={"registerForm"}>
        <h1 className="text-white">
          Please register here with , or click
          <span
            className="text-red-700"
            onClick={() => props.setLoginOrReg("login")}
          >
            {" "}
            here
          </span>{" "}
          to log in
        </h1>
        <form onSubmit={formPreventDefault}>
          <input
            type="text"
            name="username-reg"
            placeholder="username"
            onInput={(e) => props.setUsername(e.target.value)}
          ></input>
          <input
            type="text"
            name="email"
            placeholder="email"
            onInput={(e) => props.setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            name="password"
            placeholder="password"
            onInput={(e) => props.setPassword(e.target.value)}
          ></input>
          <input type="submit" onClick={props.register}></input>
        </form>
        <ErrorMessage errorStatus={props.errorStatus} />
      </div>
    );
  }
}

export default LoginForm;
