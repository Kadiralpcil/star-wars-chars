import { createBrowserRouter, RouteObject } from "react-router-dom";

import HomeRoutes from "./HomeRoutes";
import DetailRoutes from "./DetailRoutes";

const routes: RouteObject[] = [HomeRoutes, DetailRoutes];
const router = createBrowserRouter(routes);

export default router;
