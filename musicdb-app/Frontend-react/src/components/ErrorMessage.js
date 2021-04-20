import React, { useState } from "react";
import axios from "axios";

function ErrorMessage(props) {
  if (props.errorStatus) {
    return (
      <h2>
        There was an error while filling out the form, please check your
        credentials and try again
      </h2>
    );
  } else {
    return <div></div>;
  }
}

export default ErrorMessage;
