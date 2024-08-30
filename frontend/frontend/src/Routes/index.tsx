import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layouts/layoaout/Layout";
import Home from "../pasges/Home";
import Register from "../pasges/register";
import SignIn from "../pasges/signIn";
import Hotel from "../pasges/hotel";
import MyHotels from "../pasges/myHotels";
import EditHotel from "../pasges/editHotel";
import Search from "../pasges/search";
import Details from "../pasges/detail";

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
          path: "/detail/:hotelId",
          element: <Details />,
          index: true,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/register",
          element: <Register />,
        },

        {
          path: "/sign-in",
          element: <SignIn />,
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
  if (isLoggedIn) {
    routes[0].children?.push({
      path: "/my-hotels",
      element: <MyHotels />,
    });
    if (isLoggedIn) {
      routes[0].children?.push({
        path: "/edit-hotel/:hotelId",
        element: <EditHotel />,
      });
    }
  }

  return createBrowserRouter(routes);
};

export default routesConfig;
