import React, { useState } from "react";
import Input from "../AuthComponents/Input";
import Button from "../AuthComponents/Button";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        if (response.data.status === true) navigate("/dashboard");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <Input type="email" id="email" getEmail={setEmail} />
      <label htmlFor="password">Password</label>
      <Input type="password" id="password" getPassword={setPassword} />
      <Button text="Accedi" />
    </form>
  );
}

export default LoginForm;
