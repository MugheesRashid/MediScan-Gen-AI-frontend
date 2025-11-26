import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicalAILoader from "./medicalAILoader";

const MedicalAILandingPage = ({ setMedicalData }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(false);
  const file = useRef("");
  const form = useRef("");
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const cleanJsonString = (raw) => {
    return raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  };

  const fileSubmit = async () => {
    const selectedFile = file.current.files[0];
    setLoading(true);

    if (!selectedFile) {
      setLoading(false);
      alert("Please select a file");
      return;
    }

    const fileType = selectedFile.type;
    const fileName = selectedFile.name;

    // Determine if PDF or Image
    const isPDF =
      fileType === "application/pdf" || fileName.toLowerCase().endsWith(".pdf");
    const isImage =
      fileType.startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp"].includes(
        fileName.split(".").pop().toLowerCase()
      );

    if (!isPDF && !isImage) {
      setLoading(false);
      alert("Please upload a PDF or image file (JPG, PNG, etc.)");
      return;
    }

    try {
      const formData = new FormData();

      if (isPDF) {
        // Send to PDF API
        formData.append("pdf", selectedFile);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload/pdf`, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        const cleaned = cleanJsonString(result.geminiResponse);
        const json = JSON.parse(cleaned);
        setMedicalData(json);
        if (result.success) {
          if (json.status === false) {
            setLoading(false);
            alert(json.msg);
          } else {
            setLoading(false);
            navigate("/dashboard");
          }
        } else {
          alert("Error processing PDF: " + result.error);
          setLoading(false);
        }
      } else if (isImage) {
        formData.append("image", selectedFile);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload/image`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await response.json();
        const cleaned = cleanJsonString(result.geminiResponse);
        const json = JSON.parse(cleaned);
        setMedicalData(json);

        if (result.success) {
          if (json.status === false) {
            setLoading(false);
            alert(json.msg);
          } else {
            setLoading(false);
            navigate("/dashboard");
          }
        } else {
          alert("Error uploading image: " + result.error);
          setLoading(false);
        }
      }

      // Reset file input
    } catch (error) {
      console.error("Upload error:", error);
      setLoading(false);
      alert("Error uploading file: " + error.message);
    }
  };

  return (
    <>
      {loading ? (
        <MedicalAILoader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-[#0A1A2F] to-[#0D2A4A] text-white overflow-x-hidden">
          {/* Navigation */}
          <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-[url('./logo.png')] bg-cover bg-center flex items-center justify-center"></div>
              <span className="text-xl chakra-petch font-bold bg-gradient-to-r from-[#69BA4C] to-[#1F8A70] bg-clip-text text-transparent">
                MediScan
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#how-it-works"
                className="hover:text-[#00C2A8] transition-colors"
              >
                How It Works
              </a>
              <a
                href="#dashboard"
                className="hover:text-[#00C2A8] transition-colors"
              >
                Dashboard
              </a>
              <a
                href="#features"
                className="hover:text-[#00C2A8] transition-colors"
              >
                Features
              </a>
              <a
                href="#security"
                className="hover:text-[#00C2A8] transition-colors"
              >
                Security
              </a>
            </div>

            <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] hover:from-[#1F8A70] hover:to-[#00C2A8] transition-all shadow-lg shadow-[#00C2A8]/20">
              Get Started
            </button>
          </nav>

          {/* Hero Section */}
          <section className="relative py-16 md:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A1A2F] to-transparent z-0"></div>

            {/* Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00C2A8]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#1F8A70]/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 mb-12 lg:mb-0">
                  <div className="max-w-lg">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                      Understand Your Medical Reports.{" "}
                      <span className="text-[#00C2A8]">Instantly.</span>
                    </h1>

                    <p className="text-xl text-gray-300 mb-8">
                      Upload your medical reports and get clear, human-friendly
                      explanations powered by advanced AI.
                    </p>

                    {/* Upload Box */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6 hover:border-[#00C2A8]/50 transition-all">
                      <form
                        ref={form}
                        onSubmit={fileSubmit}
                        className="input hidden"
                      >
                        <input
                          onChange={() => fileSubmit()}
                          ref={file}
                          type="file"
                        />
                      </form>
                      <div className="border-2 border-dashed border-[#00C2A8]/30 rounded-xl p-8 text-center">
                        <svg
                          className="w-12 h-12 text-[#00C2A8] mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p className="text-lg mb-2">
                          Drag & drop your medical report
                        </p>
                        <p className="text-gray-400 text-sm mb-4">
                          Supports PDF, JPG, PNG formats
                        </p>
                        <button
                          onClick={() => file.current.click()}
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] hover:from-[#1F8A70] hover:to-[#00C2A8] transition-all shadow-lg shadow-[#00C2A8]/30 font-medium"
                        >
                          Upload Report
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center text-sm text-gray-400">
                      <svg
                        className="w-4 h-4 mr-2 text-[#00C2A8]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        ></path>
                      </svg>
                      <span>Secure. Private. AI-powered.</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/2 flex justify-center relative">
                  {/* Holographic Report Visualization */}
                  <div className="relative w-full max-w-lg">
                    {/* Glowing Ring Base */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] opacity-30 animate-pulse"
                      style={{ filter: "blur(30px)" }}
                    ></div>

                    {/* Main Holographic Report */}
                    <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
                      <div className="p-4 border-b border-white/10 flex justify-between items-center">
                        <div className="text-sm font-medium">
                          Medical Report Analysis
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-[#00C2A8]"></div>
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center mb-6">
                          <div className="w-12 h-12 rounded-full bg-[url('./logo.png')] bg-cover bg-center flex items-center justify-center mr-4"></div>
                          <div>
                            <h3 className="font-bold text-lg">
                              Optimal Health Status
                            </h3>
                            <p className="text-sm text-gray-300">
                              All biomarkers within normal ranges
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-[#00C2A8]/10 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              Blood Test
                            </div>
                            <div className="text-[#00C2A8] font-bold">
                              Normal
                            </div>
                          </div>
                          <div className="bg-[#00C2A8]/10 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              AI Risk Score
                            </div>
                            <div className="text-[#00C2A8] font-bold">Low</div>
                          </div>
                          <div className="bg-[#00C2A8]/10 rounded-lg p-3 text-center">
                            <div className="text-xs text-gray-400 mb-1">
                              Summary
                            </div>
                            <div className="text-[#00C2A8] font-bold">
                              Healthy
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#0A1A2F] rounded-xl p-4 border border-[#00C2A8]/20">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm">Heart Health</span>
                            <span className="text-xs text-[#00C2A8]">
                              Optimal
                            </span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-[#00C2A8] w-3/4"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#7AF4D6] opacity-70 animate-pulse"></div>
                    <div
                      className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full bg-[#7AF4D6] opacity-70 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 -right-6 w-4 h-4 rounded-full bg-[#7AF4D6] opacity-70 animate-pulse"
                      style={{ animationDelay: "2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section
            id="how-it-works"
            className="py-16 bg-gradient-to-b from-transparent to-[#0A1A2F]/50"
          >
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How MediScan AI Works
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Three simple steps to transform your medical reports into
                  actionable health insights
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#00C2A8]/30 transition-all group relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#00C2A8]/10 blur-xl"></div>

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C2A8] to-[#1F8A70] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                    <span className="text-[#0A1A2F] font-bold text-lg">1</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10">
                    Upload Your Report
                  </h3>
                  <p className="text-gray-300 mb-6 relative z-10">
                    Securely upload your medical reports in any format - PDF,
                    image, or text.
                  </p>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative z-10">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#00C2A8]/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#00C2A8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="text-center text-sm text-gray-400">
                      Drag & drop or click to upload
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#00C2A8]/30 transition-all group relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#00C2A8]/10 blur-xl"></div>

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C2A8] to-[#1F8A70] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                    <span className="text-[#0A1A2F] font-bold text-lg">2</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10">
                    AI Analysis
                  </h3>
                  <p className="text-gray-300 mb-6 relative z-10">
                    Our advanced AI scans and analyzes your report, identifying
                    key health markers and patterns.
                  </p>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative z-10">
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-[#00C2A8]/20 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-[#00C2A8]"
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
                        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#00C2A8] animate-ping"></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Data Extraction</span>
                        <span className="text-[#00C2A8]">100%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C2A8] w-full"></div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Pattern Analysis</span>
                        <span className="text-[#00C2A8]">100%</span>
                      </div>
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#00C2A8] w-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#00C2A8]/30 transition-all group relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-[#00C2A8]/10 blur-xl"></div>

                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#00C2A8] to-[#1F8A70] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
                    <span className="text-[#0A1A2F] font-bold text-lg">3</span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 relative z-10">
                    Human-Friendly Results
                  </h3>
                  <p className="text-gray-300 mb-6 relative z-10">
                    Receive easy-to-understand insights and actionable
                    recommendations for your health.
                  </p>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative z-10">
                    <div className="flex items-center justify-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-[#00C2A8]/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-[#00C2A8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          ></path>
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span>Simplified Explanations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span>Actionable Recommendations</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span>Visual Health Charts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dashboard Preview */}
          <section id="dashboard" className="py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  AI-Powered Health Dashboard
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Visualize and understand your health data with our intuitive
                  dashboard
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl overflow-hidden relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#00C2A8]/10 blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-[#1F8A70]/10 blur-3xl"></div>

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <h3 className="text-xl font-bold">Health Overview</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/15 transition-colors">
                      Weekly
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg bg-[#00C2A8] hover:bg-[#00D4BA] transition-colors">
                      Monthly
                    </button>
                    <button className="px-3 py-1 text-sm rounded-lg bg-white/10 hover:bg-white/15 transition-colors">
                      Yearly
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
                  <DashboardWidget
                    title="Heart Rate"
                    value="72"
                    unit="bpm"
                    status="normal"
                    trend="down"
                  />
                  <DashboardWidget
                    title="Blood Pressure"
                    value="120/80"
                    unit="mmHg"
                    status="normal"
                    trend="stable"
                  />
                  <DashboardWidget
                    title="Cholesterol"
                    value="180"
                    unit="mg/dL"
                    status="elevated"
                    trend="up"
                  />
                  <DashboardWidget
                    title="Blood Glucose"
                    value="95"
                    unit="mg/dL"
                    status="normal"
                    trend="stable"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold mb-4">Health Trends</h4>
                    <div className="h-48 bg-gradient-to-b from-[#00C2A8]/10 to-transparent rounded-lg flex items-end justify-between p-4">
                      {[40, 60, 75, 65, 80, 72, 68].map((value, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-6 bg-gradient-to-t from-[#00C2A8] to-[#1F8A70] rounded-t-lg"
                            style={{ height: `${value}%` }}
                          ></div>
                          <span className="text-xs mt-1">
                            {["M", "T", "W", "T", "F", "S", "S"][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold mb-4">Risk Indicators</h4>
                    <div className="space-y-4">
                      <RiskIndicator title="Cardiovascular" level={2} />
                      <RiskIndicator title="Metabolic" level={1} />
                      <RiskIndicator title="Respiratory" level={0} />
                      <RiskIndicator title="Neurological" level={0} />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold mb-3">AI Explanation</h4>
                    <p className="text-sm text-gray-300">
                      Your blood test results show optimal levels for most
                      biomarkers. Slightly elevated cholesterol may benefit from
                      dietary adjustments.
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h4 className="font-bold mb-3">Recommendations</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Increase fiber intake with oats and legumes</li>
                      <li>• Consider 30 min cardio 3x weekly</li>
                      <li>• Follow up with GP in 6 months</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            id="features"
            className="py-16 bg-gradient-to-b from-transparent to-[#0A1A2F]/50"
          >
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What You Get
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Comprehensive health insights powered by advanced AI analysis
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      ></path>
                    </svg>
                  }
                  title="Simple Explanation of Complex Reports"
                  description="Transform medical jargon into easy-to-understand language with visual aids and clear explanations."
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                      ></path>
                    </svg>
                  }
                  title="Organ-wise Risk Breakdown"
                  description="Get detailed analysis of risks specific to different organs and body systems with personalized insights."
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      ></path>
                    </svg>
                  }
                  title="AI Health Score"
                  description="Receive an overall health score based on your medical data with trend analysis and improvement suggestions."
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  }
                  title="Herbal + Natural Treatment Options"
                  description="Explore evidence-based natural remedies and herbal options that complement conventional treatments."
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      ></path>
                    </svg>
                  }
                  title="Lifestyle Routine Suggestions"
                  description="Get personalized daily routines, exercise plans, and dietary recommendations tailored to your health profile."
                />

                <FeatureCard
                  icon={
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      ></path>
                    </svg>
                  }
                  title="Future Disease Risk Prediction"
                  description="Identify potential health risks before they become serious with predictive analytics based on your data."
                />
              </div>
            </div>
          </section>

          {/* Security Section */}
          <section id="security" className="py-16">
            <div className="container mx-auto px-6">
              <div className="bg-gradient-to-r from-[#0A1A2F] to-[#0D2A4A] rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2A8]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="flex flex-col lg:flex-row items-center">
                  <div className="lg:w-1/2 mb-8 lg:mb-0 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 rounded-full bg-[#00C2A8]/20 flex items-center justify-center mr-4">
                        <svg
                          className="w-8 h-8 text-[#00C2A8]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          ></path>
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold">Security & Privacy</h2>
                    </div>

                    <p className="text-xl text-gray-300 mb-8 max-w-lg">
                      Your health data is protected with enterprise-grade
                      security and strict privacy protocols.
                    </p>

                    <div className="space-y-4">
                      <SecurityFeature title="Encrypted Data Handling" />
                      <SecurityFeature title="No Data Stored" />
                      <SecurityFeature title="Medically Verified Knowledge Sources(use Gemini latest available model)" />
                      <SecurityFeature title="Secure Upload Protocols" />
                    </div>
                  </div>

                  <div className="lg:w-1/2 flex justify-center relative">
                    {/* Animated Lock Hologram */}
                    <div className="relative">
                      <div className="w-64 h-64 rounded-full border-2 border-[#00C2A8]/30 flex items-center justify-center animate-pulse">
                        <div className="w-48 h-48 rounded-full border-2 border-[#00C2A8]/50 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border-2 border-[#00C2A8]/70 flex items-center justify-center">
                            <svg
                              className="w-20 h-20 text-[#00C2A8]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                              ></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#00C2A8]/10 animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 bg-gradient-to-b from-transparent to-[#0A1A2F]/50">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Success Stories
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  See how MediScan AI has helped people understand their health
                  better
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TestimonialCard
                  name="Sarah Johnson"
                  role="Marketing Manager"
                  quote="I finally understood my blood test results after years of confusion. The explanations were so clear!"
                  avatar="/api/placeholder/80/80"
                />

                <TestimonialCard
                  name="Michael Chen"
                  role="Software Engineer"
                  quote="The AI risk prediction helped me catch a potential issue early. My doctor was impressed with the analysis."
                  avatar="/api/placeholder/80/80"
                />

                <TestimonialCard
                  name="Emma Rodriguez"
                  role="Teacher"
                  quote="The lifestyle recommendations transformed my health. I've never felt better thanks to the personalized advice."
                  avatar="/api/placeholder/80/80"
                />
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Find answers to common questions about MediScan AI
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  <FAQItem
                    question="Is this AI medically reliable?"
                    answer="The AI provides insights based on medically verified knowledge sources, but it is not a substitute for professional medical advice, diagnosis, or treatment. While it aims to interpret your report accurately, results may not always be perfect. You should always verify important health information with a qualified healthcare professional. I am not responsible for any incorrect interpretations or decisions made based on the AI’s output."
                    isActive={activeFaq === 0}
                    onClick={() => toggleFaq(0)}
                  />

                  <FAQItem
                    question="What types of medical reports can I upload?"
                    answer="You can upload standard lab reports for analysis. The system accepts files in image formats (like JPG, PNG) and PDFs only. Our system is trained to extract and analyze data from most standard medical report formats."
                    isActive={activeFaq === 1}
                    onClick={() => toggleFaq(1)}
                  />

                  <FAQItem
                    question="Is my data safe?"
                    answer="Yes, we use end-to-end encryption and strict privacy protocols. Your data is never stored without your explicit permission, and we never share your personal health information with third parties."
                    isActive={activeFaq === 2}
                    onClick={() => toggleFaq(2)}
                  />

                  <FAQItem
                    question="Can I get treatment recommendations?"
                    answer="MediScan AI provides evidence-based lifestyle and supplement recommendations, but does not prescribe medications or replace professional medical treatment. All treatment decisions should be made in consultation with qualified healthcare providers."
                    isActive={activeFaq === 3}
                    onClick={() => toggleFaq(3)}
                  />

                  <FAQItem
                    question="Is this free or paid?"
                    answer="100% Free."
                    isActive={activeFaq === 4}
                    onClick={() => toggleFaq(4)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-16 bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] rounded-t-3xl">
            <div className="container mx-auto px-6 text-center text-[#fdfdfd] relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Take Control of Your Health Today.
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Upload your report and get clarity within seconds.
              </p>

              <button
                onClick={() => file.current.click()}
                className="px-8 py-4 rounded-xl bg-[#0A1A2F] text-white hover:bg-[#0D2A4A] transition-colors font-semibold shadow-lg mb-6"
              >
                Upload Your Medical Report
              </button>

              <div className="flex justify-center space-x-6 text-sm">
                <span>No credit card required</span>
                <span>•</span>
                <span>Free analysis</span>
                <span>•</span>
                <span>Secure & private</span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[#0A1A2F] py-8 border-t border-white/10">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="w-10 h-10 rounded-full bg-[url('./logo.png')] bg-cover bg-center flex items-center justify-center"></div>
                  <span className="text-xl chakra-petch font-bold bg-gradient-to-r from-[#69BA4C] to-[#1F8A70] bg-clip-text text-transparent">
                    MediScan
                  </span>
                </div>

                <div className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} MediScan AI. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
};

// Dashboard Widget Component
const DashboardWidget = ({ title, value, unit, status, trend }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "normal":
        return "text-[#00C2A8]";
      case "elevated":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-300";
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return (
          <svg
            className="w-4 h-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        );
      case "down":
        return (
          <svg
            className="w-4 h-4 text-[#00C2A8]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        );
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#00C2A8]/30 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-gray-300">{title}</h4>
        {getTrendIcon(trend)}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-400 ml-1">{unit}</span>
      </div>
      <div className={`text-xs mt-1 ${getStatusColor(status)}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    </div>
  );
};

// Risk Indicator Component
const RiskIndicator = ({ title, level }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 0:
        return "bg-[#00C2A8]";
      case 1:
        return "bg-yellow-500";
      case 2:
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 0:
        return "Low";
      case 1:
        return "Medium";
      case 2:
        return "High";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span>{title}</span>
      <div className="flex items-center">
        <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden mr-2">
          <div
            className={`h-full ${getLevelColor(level)}`}
            style={{ width: `${(level / 2) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs w-12 text-right">{getLevelText(level)}</span>
      </div>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#00C2A8]/30 transition-all group">
      <div className="w-14 h-14 rounded-full bg-[#00C2A8]/20 flex items-center justify-center mb-4 text-[#00C2A8] group-hover:scale-110 transition-transform">
        {icon}
      </div>

      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

// Security Feature Component
const SecurityFeature = ({ title }) => {
  return (
    <div className="flex items-center">
      <svg
        className="w-5 h-5 text-[#00C2A8] mr-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span className="text-lg">{title}</span>
    </div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, role, quote, avatar }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-[#00C2A8]/30 transition-all">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00C2A8] to-[#1F8A70] flex items-center justify-center text-white font-bold mr-4">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>

      <p className="text-gray-300 italic">"{quote}"</p>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
        onClick={onClick}
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 text-[#00C2A8] transition-transform ${
            isActive ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>

      {isActive && (
        <div className="px-6 py-4 bg-white/5 border-t border-white/10">
          <p className="text-gray-300">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default MedicalAILandingPage;
