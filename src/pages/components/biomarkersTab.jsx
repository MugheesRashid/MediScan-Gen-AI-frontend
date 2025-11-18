import React, { useState } from 'react'

const BiomarkersTab = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Biomarkers', count: Object.values(data).flat().length },
    { id: 'bloodCount', label: 'Blood Count', count: data.bloodCount.length },
    { id: 'metabolic', label: 'Metabolic', count: data.metabolic.length },
    { id: 'lipids', label: 'Lipids', count: data.lipids.length },
    { id: 'vitamins', label: 'Vitamins', count: data.vitamins.length },
    { id: 'thyroid', label: 'Thyroid', count: data.thyroid.length }
  ];

  const getBiomarkersToShow = () => {
    if (selectedCategory === 'all') {
      return Object.values(data).flat();
    }
    return data[selectedCategory];
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === category.id 
                ? 'bg-[#00C2A8] text-[#0A1A2F]' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Biomarkers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getBiomarkersToShow().map((marker, index) => (
          <BiomarkerCard key={index} marker={marker} />
        ))}
      </div>
    </div>
  );
};

const BiomarkerCard = ({ marker }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'high': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  const isInRange = (value, range) => {
    return value >= range.min && value <= range.max;
  };

  return (
    <div className={`bg-white/5 rounded-xl p-4 border transition-all hover:scale-105 ${getStatusColor(marker.status)}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-sm">{marker.name}</h3>
        <span className="text-xs opacity-70">{getTrendIcon(marker.trend)}</span>
      </div>
      
      <div className="flex items-baseline mb-1">
        <span className="text-2xl font-bold">{marker.value}</span>
        <span className="text-sm text-gray-300 ml-1">{marker.unit}</span>
      </div>
      
      <div className="text-xs text-gray-300 mb-3">
        Normal: {marker.range.min} - {marker.range.max}
      </div>
      
      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(marker.status)}`}>
        {marker.status.charAt(0).toUpperCase() + marker.status.slice(1)}
      </div>

      {!isInRange(marker.value, marker.range) && (
        <div className="mt-2 text-xs">
          {marker.value < marker.range.min ? 'Below normal range' : 'Above normal range'}
        </div>
      )}
    </div>
  );
};

export default BiomarkersTab