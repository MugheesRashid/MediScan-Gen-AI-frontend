import React, { useState } from "react";

const TrendsTab = ({ data, timeframe, onTimeframeChange }) => {
  const [selectedMetric, setSelectedMetric] = useState("overallScore");

  const metrics = [
    { id: "overallScore", label: "Overall Health Score", color: "#00C2A8" },
    { id: "cholesterol", label: "Total Cholesterol", color: "#FF6B6B" },
    { id: "glucose", label: "Fasting Glucose", color: "#FFA500" },
    { id: "vitaminD", label: "Vitamin D", color: "#4D96FF" },
  ];

  const getCurrentValue = (metric) => {
    const current = data.historical[data.historical.length - 1];
    return current[metric];
  };

  const getTrendDirection = (metric) => {
    if (data.historical.length < 2) return "stable";
    const current = data.historical[data.historical.length - 1][metric];
    const previous = data.historical[data.historical.length - 2][metric];
    return current > previous ? "up" : current < previous ? "down" : "stable";
  };

  return (
    <div className="space-y-6">
      {/* Timeframe Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["3 months", "6 months", "1 year", "All time"].map((time) => (
          <button
            key={time}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              timeframe === time
                ? "bg-[#00C2A8] text-[#0A1A2F]"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
            onClick={() => onTimeframeChange(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const currentValue = getCurrentValue(metric.id);
          const trend = getTrendDirection(metric.id);

          return (
            <div
              key={metric.id}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-400">{metric.label}</span>
                <span
                  className={`text-xs ${
                    trend === "up"
                      ? "text-red-400"
                      : trend === "down"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
                </span>
              </div>
              <div
                className="text-2xl font-bold"
                style={{ color: metric.color }}
              >
                {currentValue}
                {metric.id === "overallScore"
                  ? ""
                  : metric.id === "cholesterol" || metric.id === "glucose"
                  ? " mg/dL"
                  : " ng/mL"}
              </div>
            </div>
          );
        })}
      </div>

      {/* Historical Trends Chart */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-4">Historical Trends</h2>

        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedMetric === metric.id
                  ? "bg-[#00C2A8] text-[#0A1A2F]"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              {metric.label}
            </button>
          ))}
        </div>

        {/* Simple Bar Chart */}
        <div className="h-64 flex items-end justify-between space-x-2 p-4 bg-white/5 rounded-xl">
          {data.historical.map((point, index) => {
            const metric = metrics.find((m) => m.id === selectedMetric);
            const maxValue = Math.max(
              ...data.historical.map((p) => p[selectedMetric])
            );
            const height = (point[selectedMetric] / maxValue) * 80;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${height}%`,
                    backgroundColor: metric.color,
                    minHeight: "20px",
                  }}
                  title={`${point[selectedMetric]} on ${new Date(
                    point.date
                  ).toLocaleDateString()}`}
                ></div>
                <span className="text-xs mt-2 text-gray-400">
                  {new Date(point.date).toLocaleDateString("en-US", {
                    month: "short",
                  })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Trend Analysis */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="font-bold mb-3 text-[#00C2A8]">Trend Analysis</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Value:</span>
                <span className="font-medium">
                  {getCurrentValue(selectedMetric)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trend:</span>
                <span
                  className={`font-medium ${
                    getTrendDirection(selectedMetric) === "up"
                      ? "text-red-400"
                      : getTrendDirection(selectedMetric) === "down"
                      ? "text-green-400"
                      : "text-gray-400"
                  }`}
                >
                  {getTrendDirection(selectedMetric) === "up"
                    ? "Increasing"
                    : getTrendDirection(selectedMetric) === "down"
                    ? "Decreasing"
                    : "Stable"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Time Period:</span>
                <span className="font-medium">
                  {new Date(data.historical[0].date).toLocaleDateString()} -{" "}
                  {new Date(
                    data.historical[data.historical.length - 1].date
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 className="font-bold mb-3 text-[#00C2A8]">AI Insights</h3>
            <p className="text-sm text-gray-300">
              {selectedMetric === "overallScore"
                ? "Your health score has shown consistent improvement over the past 6 months. Continue following your lifestyle plan for further gains."
                : selectedMetric === "cholesterol"
                ? "Cholesterol levels remain elevated but stable. Focus on dietary changes and increased physical activity."
                : selectedMetric === "glucose"
                ? "Glucose levels are trending upward slightly. Monitor carbohydrate intake and maintain regular exercise."
                : "Vitamin D levels need significant improvement. Ensure consistent supplementation and sunlight exposure."}
            </p>
          </div>
        </div>
      </div>

      {/* Future Predictions */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-4">Future Health Predictions</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.predictions.map((prediction, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#00C2A8]/30 transition-all"
            >
              <h3 className="font-bold text-[#00C2A8] mb-3">
                {prediction.timeframe}
              </h3>

              <div className="flex items-center mb-4">
                <div className="text-3xl font-bold mr-3">
                  {prediction.expectedScore}
                </div>
                <div className="text-sm text-green-400">
                  +
                  {prediction.expectedScore -
                    data.historical[data.historical.length - 1]
                      .overallScore}{" "}
                  points
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-400">
                  Expected Improvements:
                </h4>
                <ul className="space-y-1 text-sm">
                  {prediction.improvements.map((improvement, impIndex) => (
                    <li key={impIndex} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                      <span className="text-gray-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Confidence */}
        <div className="mt-6 bg-[#00C2A8]/10 rounded-xl p-4 border border-[#00C2A8]/20">
          <h3 className="font-bold mb-2 text-[#00C2A8]">
            Prediction Confidence
          </h3>
          <p className="text-sm text-gray-300">
            These predictions are based on your current biomarker trends,
            adherence to recommended lifestyle changes, and historical health
            data. The AI model has an 87% accuracy rate for 6-month health
            outcome predictions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrendsTab;
