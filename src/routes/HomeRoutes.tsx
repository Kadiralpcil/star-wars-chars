import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { DefaultLayout } from "../layout/DefaultLayout";

const HomeRoutes: RouteObject = {
  path: "/",
  element: <DefaultLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default HomeRoutes;
