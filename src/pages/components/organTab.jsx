
const OrgansTab = ({ data, selectedOrgan, onSelectOrgan }) => {
  const organs = Object.entries(data).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    ...value
  }));

  const getOrganStatusColor = (status) => {
    switch(status) {
      case 'healthy': return 'bg-green-500 border-green-500';
      case 'slight': return 'bg-yellow-500 border-yellow-500';
      case 'moderate': return 'bg-orange-500 border-orange-500';
      case 'critical': return 'bg-red-500 border-red-500';
      default: return 'bg-gray-500 border-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'healthy': return 'Optimal';
      case 'slight': return 'Minor Issues';
      case 'moderate': return 'Needs Attention';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* Organ Health Overview */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-4">Organ Health Overview</h2>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Body Diagram */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-80">
              {/* Body Outline */}
              <div className="absolute inset-0 border-2 border-gray-600 rounded-full opacity-30"></div>
              
              {/* Organs */}
              {organs.map((organ, index) => {
                const positions = {
                  heart: { top: '35%', left: '50%' },
                  liver: { top: '45%', left: '35%' },
                  kidneys: { top: '55%', left: '65%' },
                  thyroid: { top: '25%', left: '50%' },
                  pancreas: { top: '50%', left: '50%' },
                  blood: { top: '40%', left: '50%' }
                };
                
                const pos = positions[organ.name.toLowerCase()] || { top: '50%', left: '50%' };
                
                return (
                  <div
                    key={organ.name}
                    className={`absolute w-8 h-8 rounded-full border-2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                      selectedOrgan === organ.name.toLowerCase() 
                        ? 'scale-125 ring-2 ring-[#00C2A8]' 
                        : 'hover:scale-110'
                    } ${getOrganStatusColor(organ.status)}`}
                    style={{ top: pos.top, left: pos.left }}
                    onClick={() => onSelectOrgan(organ.name.toLowerCase())}
                    title={`${organ.name}: ${getStatusText(organ.status)}`}
                  >
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                      {organ.name.charAt(0)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Organ Details */}
          <div className="flex-1">
            <h3 className="font-bold mb-4">Organ Status Details</h3>
            <div className="space-y-4">
              {organs.map((organ) => (
                <div
                  key={organ.name}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedOrgan === organ.name.toLowerCase() 
                      ? 'border-[#00C2A8] bg-[#00C2A8]/10' 
                      : 'border-white/10 bg-white/5'
                  }`}
                  onClick={() => onSelectOrgan(organ.name.toLowerCase())}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${getOrganStatusColor(organ.status).split(' ')[0]}`}></div>
                      <span className="font-medium">{organ.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Score: {organ.score}/100</span>
                      <div className="w-16 bg-white/10 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            organ.status === 'healthy' ? 'bg-green-500' :
                            organ.status === 'slight' ? 'bg-yellow-500' :
                            organ.status === 'moderate' ? 'bg-orange-500' :
                            organ.status === '-' ? 'bg-grey-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${organ.score}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{organ.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Organ Health Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30 text-center">
          <div className="text-2xl font-bold text-green-400">{organs.filter(o => o.status === 'healthy').length}</div>
          <div className="text-sm text-gray-300">Healthy</div>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30 text-center">
          <div className="text-2xl font-bold text-yellow-400">{organs.filter(o => o.status === 'slight').length}</div>
          <div className="text-sm text-gray-300">Minor Issues</div>
        </div>
        <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/30 text-center">
          <div className="text-2xl font-bold text-orange-400">{organs.filter(o => o.status === 'moderate').length}</div>
          <div className="text-sm text-gray-300">Needs Attention</div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 text-center">
          <div className="text-2xl font-bold text-red-400">{organs.filter(o => o.status === 'critical').length}</div>
          <div className="text-sm text-gray-300">Critical</div>
        </div>
      </div>
    </div>
  );
};

export default OrgansTab