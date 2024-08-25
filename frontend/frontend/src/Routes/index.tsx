import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/layoaout/Layout";
import Home from "../pasges/Home";
import Register from "../pasges/register";
import SignIn from "../pasges/signIn";
import Hotel from "../pasges/hotel";

const routesConfig = (isLoggedIn: boolean) => {
  const routes = [
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
  ];

  if (isLoggedIn) {
    routes[0].children?.push({
      path: "/addHotel",
      element: <Hotel />,
    });
  }

  return createBrowserRouter(routes);
};

export default routesConfig;
