import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/layoaout/Layout";
import Home from "../pasges/Home";
import Register from "../pasges/register";
import SignIn from "../pasges/signIn";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/search",
        element: <span className="text-4xl">search page</span>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },

  { path: "*", element: <Navigate to="/" /> },
]);

export default routes;
