import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import UserDashboard from "./Dashboard/Student";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import Student from "./Dashboard/Student";
import Teacher from "./Dashboard/Teacher";
import Admin from "./Dashboard/Admin";
import { useParams } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const { role } = useContext(AppContext);


  return (
    <div>
      {role === "admin" ? <Admin id={routeParams}/> : role === "student" ? <Student id={routeParams}/> : role === "teacher" ? <Teacher id={routeParams}/> : navigate("/login")}
    </div>
  );
}

export default Dashboard;
