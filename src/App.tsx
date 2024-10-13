import { RouterProvider } from "react-router-dom";

import router from "./routes";

import "./App.css";
import Loader from "./components/Loader";

function App() {
  return <RouterProvider router={router} fallbackElement={<Loader />} />;
}

export default App;
