import React, { useState } from "react";
import App from "../App";
import Login from "../Login";

function Home(props) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  if (isLoggedIn) {
    return <App setLoggedIn={setLoggedIn} />;
  } else if (!isLoggedIn) {
    return <Login setLoggedIn={setLoggedIn} />;
  }
}

export default Home;
