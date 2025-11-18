

const OverviewTab = ({ data, abnormalCount }) => {
  return (
    <div className="space-y-6">
      {/* Health Score Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 flex justify-center mb-6 md:mb-0">
            <HealthScoreGauge score={data.overallHealth.score} />
          </div>
          <div className="flex-1 space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-2">Identified Concerns</h3>
              <ul className="space-y-2">
                {data.overallHealth.concerns.map((concern, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span>{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <h3 className="font-bold mb-2">AI Confidence</h3>
              <div className="flex items-center">
                <div className="w-full bg-white/10 rounded-full h-2 mr-3">
                  <div 
                    className="bg-[#00C2A8] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${data.overallHealth.confidence}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{data.overallHealth.confidence}%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Based on data quality and pattern recognition</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Summary */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div className="flex items-start mb-4">
          <div className="w-10 h-10 rounded-full bg-[#00C2A8]/20 flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-[#00C2A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">AI Health Summary</h2>
            <p className="text-gray-400 text-sm">Personalized analysis of your medical report</p>
          </div>
        </div>
        
        <div className="bg-[#E8F6F3]/10 rounded-xl p-4 border border-[#00C2A8]/20">
          <p className="text-gray-300 leading-relaxed">{data.overallHealth.summary}</p>
          <div className="flex items-center mt-4 text-sm text-[#00C2A8]">
            <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2 animate-pulse"></div>
            <span>AI-generated summary • Updated {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold mb-3">Report Statistics</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Biomarkers</span>
              <span className="font-medium">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Abnormal Values</span>
              <span className="font-medium text-yellow-400">{abnormalCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Organ Systems</span>
              <span className="font-medium">6</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Risk Factors</span>
              <span className="font-medium text-orange-400">{data.risks.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <h3 className="font-bold mb-3">Health Trends</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Score Change</span>
              <span className="font-medium text-green-400">+{data.overallHealth.trends.improvement} points</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Checkup</span>
              <span className="font-medium">{new Date(data.user.lastCheckup).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Next Recommended</span>
              <span className="font-medium">3 months</span>
            </div>
          </div>
          <HealthScoreGauge score={data.overallHealth.score} />
        </div>
      </div>
    </div>
  );
};

const HealthScoreGauge = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#00C2A8';
    if (score >= 60) return '#FFA500';
    return '#FF6B6B';
  };

  return (
    <div className="relative">
      <div className="w-48 h-48 rounded-full border-8 border-[#0A1A2F] relative overflow-hidden">
        {/* Gradient Arc */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00C2A8] via-[#FFA500] to-[#FF6B6B] opacity-70"></div>
        
        {/* Mask for partial fill based on score */}
        <div 
          className="absolute inset-0 rounded-full bg-[#0A1A2F] transform -rotate-90 origin-center transition-all duration-1000"
          style={{ clipPath: `inset(0 0 0 ${100 - score}%)` }}
        ></div>
        
        {/* Center Content */}
        <div className="absolute inset-8 rounded-full bg-[#0A1A2F] flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: getScoreColor(score) }}>{score}</span>
          <span className="text-sm text-gray-400">Health Score</span>
        </div>
      </div>
      
      {/* Floating Particles */}
      <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#7AF4D6] opacity-70 animate-pulse"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-[#7AF4D6] opacity-70 animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
  );
};

export default OverviewTab;
