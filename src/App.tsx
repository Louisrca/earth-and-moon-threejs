import "./App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import MoonPractice from "./pages/practice/MoonPractice";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MoonPractice />} />
        {/* <Route path="/" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
