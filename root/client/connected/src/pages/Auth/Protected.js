import React from "react";
import { Outlet, useNavigate } from "react-router";
import { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import Admin from "./Dashboard/Admin";
import Student from "./Dashboard/Student";
import Teacher from "./Dashboard/Teacher";
function Protected() {
  const navigate = useNavigate();
  const { role, setRole } = useContext(AppContext);

  return (
    <>
      {role === "admin" || role === "student" || role === "teacher" ? (
        <Outlet />
      ) : (
        navigate("/login")
      )}
    </>
   
  );
}

export default Protected;
