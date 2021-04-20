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
      <div className="loginPage" key={"loginForm"}>
        <h1>
          Please login here with an existing username, or click
          <span onClick={() => props.setLoginOrReg("register")}> here</span> to
          register
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
            type="text"
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
      <div className="registerPage" key={"registerForm"}>
        <h1>
          Please register here with , or click
          <span onClick={() => props.setLoginOrReg("login")}> here</span> to log
          in
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
            type="text"
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
