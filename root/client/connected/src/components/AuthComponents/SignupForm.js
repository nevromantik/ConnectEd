import React from "react";
import Button from "./Button";
import Input from "./Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"
function SignupForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/register", {
        email: email,
        password: password,
        name: name,
        lastname: lastname
      })
      .then(function (response) {
        console.log(response);
        if (response.data.created === true) navigate("/");
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
      <label htmlFor="name">Nome</label>
      <Input type="text" id="name" getName={setName} />
      <label htmlFor="lastname">Cognome</label>
      <Input type="text" id="lastname" getLastname={setLastname} />
      <Button text="Iscriviti" />
    </form>
  );
}

export default SignupForm;
