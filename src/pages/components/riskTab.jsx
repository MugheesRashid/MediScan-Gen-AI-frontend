// Risks Tab Component
const RisksTab = ({ data, selectedRisk, onSelectRisk }) => {
  const getRiskColor = (probability) => {
    switch(probability) {
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'low-moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'moderate': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-4">Health Risk Assessment</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {data.filter(d=> d.name !== '-' ).map(risk => (
            <div
              key={risk.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedRisk === risk.id
                  ? 'border-[#00C2A8] bg-[#00C2A8]/10 scale-105' 
                  : 'border-white/10 bg-white/5 hover:border-[#00C2A8]/30'
              } ${getRiskColor(risk.probability)}`}
              onClick={() => onSelectRisk(risk.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">{risk.name}</h3>
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center mb-2">
                <div className="w-full bg-white/10 rounded-full h-2 mr-3">
                  <div 
                    className={`h-2 rounded-full ${
                      risk.probability === 'Low' ? 'bg-green-500' :
                      risk.probability === 'Low-Moderate' ? 'bg-yellow-500' :
                      risk.probability === 'Moderate' ? 'bg-orange-500' :
                      risk.probability === 'High' ? 'bg-red-500' : 'bg-grey-500'
                    }`}
                    style={{ width: `${risk.score}%` }}
                  ></div>
                </div>
                <span className={`text-sm font-medium ${getRiskScoreColor(risk.score)}`}>
                  {risk.score}%
                </span>
              </div>
              <p className="text-xs text-gray-300 line-clamp-2">{risk.description}</p>
            </div>
          ))}
        </div>

        {/* Selected Risk Details */}
        {selectedRisk && (() => {
          const risk = data.find(r => r.id === selectedRisk);
          if (!risk) return null;
          
          return (
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">{risk.name}</h3>
                  <p className="text-gray-300">{risk.description}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(risk.probability)}`}>
                  {risk.probability.toUpperCase()} RISK
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3 text-[#00C2A8]">Contributing Factors</h4>
                  <ul className="space-y-2">
                    {risk.factors.map((factor, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-3 text-[#00C2A8]">Recommended Actions</h4>
                  <ul className="space-y-2">
                    {risk.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#00C2A8]/10 rounded-lg border border-[#00C2A8]/20">
                <h4 className="font-bold mb-2 text-[#00C2A8]">AI Insight</h4>
                <p className="text-sm text-gray-300">
                  Based on your current biomarkers and lifestyle factors, addressing these recommendations 
                  could reduce your {risk.name.toLowerCase()} risk by approximately {Math.round(100 - risk.score)}% 
                  within the next 6-12 months.
                </p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Risk Mitigation Timeline */}
      {/* <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-bold mb-4">Risk Reduction Timeline</h3>
        <div className="space-y-4">
          {[
            { period: "Immediate (0-1 month)", actions: ["Start Vitamin D3 supplementation", "Begin dietary adjustments"] },
            { period: "Short-term (1-3 months)", actions: ["Establish exercise routine", "Monitor blood pressure weekly"] },
            { period: "Medium-term (3-6 months)", actions: ["Follow-up blood tests", "Weight management goals"] },
            { period: "Long-term (6+ months)", actions: ["Maintain healthy habits", "Annual comprehensive checkup"] }
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <div className="w-3 h-3 rounded-full bg-[#00C2A8] mt-1 mr-4"></div>
              <div className="flex-1">
                <h4 className="font-medium mb-2">{item.period}</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  {item.actions.map((action, actionIndex) => (
                    <li key={actionIndex}>• {action}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default RisksTab;