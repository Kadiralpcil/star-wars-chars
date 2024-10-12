import { RouteObject } from "react-router-dom";

import NotFound from "../pages/NotFound";
import React, { Suspense } from "react";
import { DefaultLayout } from "../layout/DefaultLayout";

const Detail = React.lazy(() => import("./../pages/Detail"));

const DetailRoutes: RouteObject = {
  path: "/detail",
  element: (
    <Suspense fallback={<div>Loading...</div>}>
      <DefaultLayout />
    </Suspense>
  ),
  children: [
    {
      index: true,
      element: <Detail />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default DetailRoutes;
