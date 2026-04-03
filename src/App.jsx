import "./App.css";
import Navbar from "./component/Navbar";
import HealthTips from "./pages/HealthTips";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/health" element={<HealthTips />} />
      </Routes>
    </div>
  );
}

export default App;