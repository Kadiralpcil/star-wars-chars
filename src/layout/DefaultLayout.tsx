import { Outlet } from "react-router-dom";

import "./defaultLayout.scss";

export const DefaultLayout = () => {
  return (
    <div className="default-layout">
      {/* <TheHeader /> */}
      <Outlet />
    </div>
  );
};
