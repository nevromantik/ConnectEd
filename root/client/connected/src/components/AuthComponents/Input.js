import React from "react";

function Input({ type, id, getEmail, getPassword, getName, getLastname, getLicense }) {
  let handleInput = null;

  switch (id) {
    case "email":
      handleInput = getEmail;
      break;
    case "password":
      handleInput = getPassword;
      break;
    case "name":
      handleInput = getName;
      break;
    case "lastname":
      handleInput = getLastname;
      break;
    case "license":
      handleInput = getLicense;
      break;

    default:
      handleInput = null;
  }
  return (
    <div>
      <input
        type={type}
        id={id}
        onChange={(e) => handleInput(e.target.value)}
      ></input>
    </div>
  );
}

export default Input;
