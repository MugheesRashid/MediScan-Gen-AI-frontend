import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MedicalAILandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import MedicalAILoader from "./pages/medicalAILoader";

function App() {
  const [medicalData, setMedicalData] = useState(null);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<MedicalAILandingPage setMedicalData={setMedicalData} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard medicalData={medicalData} />}
        />
        <Route path="/loading" element={<MedicalAILoader />} />
      </Routes>
    </>
  );
}

export default App;
