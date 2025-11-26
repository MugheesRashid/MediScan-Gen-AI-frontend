import React, { Suspense, lazy, useEffect } from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MedicalAILoader from "./pages/medicalAILoader";
import LoadingScreen from "./pages/loadingScreen"

const MedicalAILandingPage = lazy(() => import("./pages/landing"));
const Dashboard = lazy(() => import("./pages/dashboard"));

function App() {
  const [medicalData, setMedicalData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("medicalData");
    if (stored && !medicalData) setMedicalData(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (medicalData) sessionStorage.setItem("medicalData", JSON.stringify(medicalData));
  }, [medicalData]);

  return (
    <Suspense fallback={<LoadingScreen />}>
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
    </Suspense>
  );
}

export default App;
