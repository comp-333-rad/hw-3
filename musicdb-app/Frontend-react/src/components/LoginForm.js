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
      <div className="loginPage text-center justify-center flex items-center flex-col" key={"loginForm"}>
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
        <form onSubmit={formPreventDefault} className = "flex flex-col w-56 m-4">
          <input className = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="username"
            placeholder="username"
            id="username"
            onInput={(e) => props.setUsername(e.target.value)}
          ></input>
          <input className = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="password"
            name="password"
            placeholder="password"
            onInput={(e) => props.setPassword(e.target.value)}
          ></input>
          <input className = "bg-purple hover:bg-blue-dark text-black font-bold py-2 px-4 rounded" type="submit" onClick={props.logMeIn}></input>
        </form>
        <ErrorMessage errorStatus={props.errorStatus} />
      </div>
    );
  } else {
    return (
      <div className="registerPage text-center justify-center flex items-center flex-col" key={"registerForm"}>
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
        <form onSubmit={formPreventDefault} className = "m-4" >
          <input className = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="username-reg"
            placeholder="username"
            onInput={(e) => props.setUsername(e.target.value)}
          ></input>
          <input className = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
            name="email"
            placeholder="email"
            onInput={(e) => props.setEmail(e.target.value)}
          ></input>
          <input className = "appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="password"
            name="password"
            placeholder="password"
            onInput={(e) => props.setPassword(e.target.value)}
          ></input>
          <input className = "bg-purple text-black px-3 py-2 rounded w-full mt-4" type="submit" onClick={props.register}></input>
        </form>
        <ErrorMessage errorStatus={props.errorStatus} />
      </div>
    );
  }
}

export default LoginForm;
