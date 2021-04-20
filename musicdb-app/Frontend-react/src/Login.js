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

  // function EntranceForm(props) {
  //   console.log("rerendering entrance form");
  //   if (loginOrReg == "login") {
  //     return (
  //       <div className="loginPage" key={"loginForm"}>
  //         <h1>
  //           Please login here with an existing username, or click
  //           <span onClick={() => setLoginOrReg("register")}>here</span> to
  //           register
  //         </h1>
  //         <form onSubmit={formPreventDefault}>
  //           <input
  //             type="text"
  //             name="username"
  //             placeholder="username"
  //             id="username"
  //             value={username}
  //             onInput={(e) => setUsername(e.target.value)}
  //           ></input>
  //           <input
  //             type="text"
  //             name="password"
  //             placeholder="password"
  //             onInput={(e) => setPassword(e.target.value)}
  //           ></input>
  //           <input type="submit" onClick={logMeIn}></input>
  //         </form>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div className="registerPage" key={"registerForm"}>
  //         <h1>
  //           Please register here with , or click
  //           <span onClick={() => setLoginOrReg("login")}>here</span> to log in
  //         </h1>
  //         <form onSubmit={formPreventDefault}>
  //           <input
  //             type="text"
  //             name="username-reg"
  //             placeholder="username"
  //             onInput={(e) => setUsername(e.target.value)}
  //           ></input>
  //           <input
  //             type="text"
  //             name="email"
  //             placeholder="email"
  //             value={email}
  //             onInput={(e) => setEmail(e.target.value)}
  //           ></input>
  //           <input
  //             type="text"
  //             name="password"
  //             placeholder="password"
  //             onInput={(e) => setPassword(e.target.value)}
  //           ></input>
  //           <input type="submit" onClick={register}></input>
  //         </form>
  //       </div>
  //     );
  //   }
  // }

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
        props.setLoginStatus(true);
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
