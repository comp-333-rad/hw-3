import React, { useState } from "react";
import axios from "axios";
import App from "../App";
import Login from "../Login";

function Home(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  if (isLoggedIn) {
    return <App  />;
  } else if (!isLoggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }
}

export default Home;
