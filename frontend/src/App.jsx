import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Charater from "./components/Charater";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <div>
      <AllRoutes />
      {/* <Charater /> */}
    </div>
  );
}

export default App;
