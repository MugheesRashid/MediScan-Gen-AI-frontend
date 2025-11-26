import React, { useState, useEffect } from "react";
import OverviewTab from "./components/overviewTab";
import BiomarkersTab from "./components/biomarkersTab";
import LifestyleTab from "./components/lifestyleTab";
import OrgansTab from "./components/organTab";
import RisksTab from "./components/riskTab";
import TrendsTab from "./components/TrendsTab";
import Medication from "./components/medicationTab";

const MedicalAIDashboard = ({ medicalData }) => {
  useEffect(() => {
    if (medicalData === null) return () => <p>Loading...</p>;
    if (!medicalData.name) return () => <p>Invalid medical report.</p>;
  }, [medicalData]);

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedOrgan, setSelectedOrgan] = useState("heart");
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [timeframe, setTimeframe] = useState("6 months");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const getBioMarkers = () => {
    if (!medicalData || !medicalData.biomarkers) return [];
    const allBiomarkers = [
      ...medicalData.biomarkers.bloodCount,
      ...medicalData.biomarkers.metabolic,
      ...medicalData.biomarkers.lipids,
      ...medicalData.biomarkers.vitamins,
      ...medicalData.biomarkers.thyroid,
    ];
    return allBiomarkers.filter((b) => b.status !== "-");
  };

  const getOrganStatusCount = () => {
    if (!medicalData || !medicalData.organHealth) return {};
    const organs = Object.values(medicalData.organHealth);
    return {
      healthy: organs.filter((o) => o.status === "healthy").length,
      slight: organs.filter((o) => o.status === "slight").length,
      moderate: organs.filter((o) => o.status === "moderate").length,
      critical: organs.filter((o) => o.status === "critical").length,
    };
  };

  const BioMarkers = getBioMarkers();
  const organStatusCount = getOrganStatusCount();

  return (
    <>
      {medicalData !== null && (
        <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#0D2A4A] text-white">
          {/* Navigation */}
          <nav className="sticky top-0 z-50 bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-[url('./logo.png')] bg-cover bg-center flex items-center justify-center"></div>
                <span className="text-xl chakra-petch font-bold bg-gradient-to-r from-[#69BA4C] to-[#1F8A70] bg-clip-text text-transparent">
                  MediScan
                </span>
              </div>

              <div className="hidden md:block">
                <h1 className="text-xl font-semibold">AI Health Dashboard</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium">{medicalData.user.name}</div>
                  <div className="text-sm text-gray-400">
                    Age: {medicalData.user.age} • {medicalData.user.gender}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] flex items-center justify-center">
                  <span className="text-sm font-medium">JD</span>
                </div>
              </div>
            </div>
          </nav>

          <div className="container mx-auto px-4 py-6">
            {/* Report Header */}
            <div className="bg-gradient-to-r from-[#00C2A8]/10 to-[#1F8A70]/10 rounded-2xl p-6 border border-[#00C2A8]/20 mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Health Analysis Report
                  </h1>
                  <p className="text-gray-300">
                    Based on your {medicalData.report.type} from{" "}
                    {medicalData.report.lab}
                  </p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col md:items-end space-y-2">
                  <div className="flex items-center space-x-4 text-sm">
                    <div>
                      <span className="text-gray-400">Upload Date:</span>
                      <span className="ml-2">
                        {new Date(
                          medicalData.report.uploadDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Report ID:</span>
                      <span className="ml-2">{medicalData.report.id}</span>
                    </div>
                  </div>

                  <div className="px-4 py-1 bg-[#00C2A8]/20 border border-[#00C2A8] rounded-full text-[#7AF4D6] text-sm font-medium flex items-center">
                    <div className="w-2 h-2 bg-[#7AF4D6] rounded-full mr-2 animate-pulse"></div>
                    Analysis {medicalData.report.status}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex space-x-1 mb-8 bg-white/5 rounded-xl p-1 w-full overflow-x-auto">
              {[
                { id: "overview", label: "Overview" },
                { id: "biomarkers", label: "Biomarkers" },
                { id: "organs", label: "Organ Health" },
                { id: "risks", label: "Risk Assessment" },
                { id: "lifestyle", label: "Lifestyle Plan" },
                { id: "medication", label: "Medication" },
                // { id: "trends", label: "Trends & Progress" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-[#00C2A8] text-[#0A1A2F]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {activeTab === "overview" && (
                  <OverviewTab
                    data={medicalData}
                    abnormalCount={
                      BioMarkers.filter(
                        (b) => b.status && b.status !== "normal"
                      ).length
                    }
                  />
                )}
                {activeTab === "biomarkers" && (
                  <BiomarkersTab data={medicalData.biomarkers} />
                )}
                {activeTab === "organs" && (
                  <OrgansTab
                    data={medicalData.organHealth}
                    selectedOrgan={selectedOrgan}
                    onSelectOrgan={setSelectedOrgan}
                  />
                )}
                {activeTab === "risks" && (
                  <RisksTab
                    data={medicalData.risks}
                    selectedRisk={selectedRisk}
                    onSelectRisk={setSelectedRisk}
                  />
                )}
                {activeTab === "lifestyle" && (
                  <LifestyleTab data={medicalData.recommendations} />
                )}
                {activeTab === "medication" && (
                  <Medication
                    medication={medicalData.recommendations.medication}
                  />
                )}
                {/* {activeTab === "trends" && (
                  <TrendsTab
                    data={medicalData.trends}
                    timeframe={timeframe}
                    onTimeframeChange={setTimeframe}
                  />
                )} */}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <QuickStats
                  overallScore={medicalData.overallHealth.score}
                  abnormalCount={
                    BioMarkers.filter((b) => b.status !== "normal").length
                  }
                  organStatus={organStatusCount}
                  riskCount={medicalData.risks.length}
                />

                <AbnormalMarkers markers={BioMarkers} />

                {/* <ActionItems data={medicalData} /> */}
              </div>
            </div>
          </div>

          {/* AI Chat Assistant */}
          <AIChatAssistant
            isOpen={isChatOpen}
            onToggle={() => setIsChatOpen(!isChatOpen)}
          />
        </div>
      )}
    </>
  );
};

// Sidebar Components
const QuickStats = ({
  overallScore,
  abnormalCount,
  organStatus,
  riskCount,
}) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <h3 className="font-bold mb-4">Health Overview</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Overall Score</span>
          <span className="text-2xl font-bold text-[#00C2A8]">
            {overallScore}/100
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Abnormal Markers</span>
          <span className="text-lg font-medium text-yellow-400">
            {abnormalCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Healthy Organs</span>
          <span className="text-lg font-medium text-green-400">
            {organStatus.healthy}/6
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400">Identified Risks</span>
          <span className="text-lg font-medium text-orange-400">
            {riskCount}
          </span>
        </div>
      </div>
    </div>
  );
};

const AbnormalMarkers = ({ markers }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <h3 className="font-bold mb-4">Biomarkers</h3>
      <div className="space-y-3">
        {markers
          .slice(0, 5) // limit to 5
          .map((marker, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div>
                <div className="font-medium text-sm">{marker.name}</div>
                <div className="text-xs text-gray-400">
                  {marker.value} {marker.unit}
                </div>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  marker.status === "high"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : marker.status === "low"
                    ? "bg-blue-500/20 text-blue-400"
                    : marker.status === "critical"
                    ? "bg-red-700/20 text-red-600"
                    : marker.status === "normal"
                    ? "bg-green-500/20 text-green-600"
                    : "bg-gray-500/20 text-gray-400" // default fallback
                }`}
              >
                {marker.status.toUpperCase()}
              </div>
            </div>
          ))}

        {markers.length > 5 && (
          <div className="text-center text-sm text-gray-400">
            +{markers.length - 5} more markers
          </div>
        )}
      </div>
    </div>
  );
};

// AI Chat Component
const AIChatAssistant = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you understand your results today?",
      isAI: true,
    },
  ]);
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const newUserMessage = { id: Date.now(), text: inputText, isAI: false };
    setMessages((prev) => [...prev, newUserMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: "Sorry, I am out of order for now...",
        isAI: true,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInputText("");
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] flex items-center justify-center shadow-lg shadow-[#00C2A8]/30 hover:scale-110 transition-transform"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white/10 backdrop-blur-md rounded-2xl border border-[#00C2A8] shadow-2xl flex flex-col">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-[#00C2A8] flex items-center justify-center mr-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <span className="font-medium">Health Assistant</span>
        </div>
        <button onClick={onToggle} className="text-gray-400 hover:text-white">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${message.isAI ? "text-left" : "text-right"}`}
          >
            <div
              className={`inline-block rounded-xl p-3 max-w-xs ${
                message.isAI
                  ? "bg-[#00C2A8]/20 text-white"
                  : "bg-[#00C2A8] text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10">
        <div className="flex">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about your results..."
            className="flex-1 bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-[#00C2A8]"
          />
          <button
            onClick={handleSend}
            className="bg-[#00C2A8] hover:bg-[#00D4BA] transition-colors rounded-r-lg px-4 flex items-center justify-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Action Items Component
// const ActionItems = ({ data }) => {
//   const urgentActions = [
//     {
//       action: "Start Vitamin D3 supplement",
//       priority: "high",
//       due: "Immediately",
//     },
//     {
//       action: "Schedule follow-up blood test",
//       priority: "medium",
//       due: "2 weeks",
//     },
//     {
//       action: "Begin cholesterol management diet",
//       priority: "medium",
//       due: "1 week",
//     },
//   ];

//   return (
//     <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
//       <h3 className="font-bold mb-4">Recommended Actions</h3>
//       <div className="space-y-3">
//         {urgentActions.map((item, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
//           >
//             <div className="flex items-center">
//               <div
//                 className={`w-2 h-2 rounded-full mr-3 ${
//                   item.priority === "high" ? "bg-red-500" : "bg-yellow-500"
//                 }`}
//               ></div>
//               <div>
//                 <div className="font-medium text-sm">{item.action}</div>
//                 <div className="text-xs text-gray-400">Due: {item.due}</div>
//               </div>
//             </div>
//             <button className="text-[#00C2A8] hover:text-[#7AF4D6] text-sm font-medium"></button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

export default MedicalAIDashboard;
