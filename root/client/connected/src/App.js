import "./App.css";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Dashboard from "./pages/Auth/Dashboard";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import Protected from "./pages/Auth/Protected";

export const AppContext = createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      element: <Protected />,
      children: [
        {
          path: "dashboard/:role/:id",
          element: <Dashboard />,
        },
      ],
    },
  ]);


  return (
    <div className="App">
      <AppContext.Provider value={{ setIsAuth, isAuth, role, setRole }}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
