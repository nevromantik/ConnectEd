import React, { useState } from "react";
import Input from "../AuthComponents/Input";
import Button from "../AuthComponents/Button";
import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

function LoginForm() {
  const { isAuth, setIsAuth, role, setRole} = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response);

        if (response.data.status === true && response.data.role === "admin") {
          setIsAuth(true);
          setAuthError("");
          setRole("admin");
          navigate("/dashboard/" + response.data.role + "/" + response.data.user);
        } else if (response.data.status === false) {
          setIsAuth(false);
          setAuthError("Utente inesistente, registrati.");
          navigate("/signup");
        } else if(response.data.role === "teacher"){

          setRole("teacher");
          navigate("/dashboard" + response.data.role + "/" + response.data.user);

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" getEmail={setEmail} />
        <label htmlFor="password">Password</label>
        <Input type="password" id="password" getPassword={setPassword} />
        <Button text="Accedi" />
      </form>
      <p>{authError}</p>
    </>
  );
}

export default LoginForm;
