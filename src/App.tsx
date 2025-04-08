import "./App.css";
import { Routes, Route } from "react-router-dom";
import SolarSystem from "./pages/solarSystem/SolarSystem";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SolarSystem />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
