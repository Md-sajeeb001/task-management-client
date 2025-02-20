import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Signup from "../Pages/Singup/Signup";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "home",
        element: <DashboardHome></DashboardHome>,
      },
    ],
  },
]);
export default router;
