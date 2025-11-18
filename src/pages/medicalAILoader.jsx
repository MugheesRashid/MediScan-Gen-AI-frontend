import React, { useState, useEffect } from 'react';

const MedicalAILoader = () => {
 const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Uploading report...",
    "Analyzing data...",
    "Generating insights...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1A2F] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#00C2A8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white">{loadingTexts[currentText]}</div>
      </div>
    </div>
  );
};

export default MedicalAILoader;