import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/home";
import CarDetails from "../pages/carDetails/carDetails";
import Dashboard from "../pages/dashboard/dashboard";
import NewCar from "../pages/dashboard/newCar/newCar";
import SignIn from "../pages/signIn/signIn";
import SignUp from "../pages/signUp/signUp";
import Layout from "../components/layout/layout";
import { Private } from "./private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <CarDetails />,
      },
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/newcar",
        element: (
          <Private>
            <NewCar />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);
