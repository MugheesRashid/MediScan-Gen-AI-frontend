import React, { useState } from 'react';

const Medication = ({ medication}) => {
  const [selectedRemedy, setSelectedRemedy] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-[#00C2A8]/20 flex items-center justify-center mr-3">
            <svg className="w-6 h-6 text-[#00C2A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold">Natural Home Remedies</h2>
            <p className="text-gray-400 text-sm">Simple, natural approaches to support your health</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Remedies List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#00C2A8] mb-4">Recommended Remedies</h3>
          {medication.map((remedy) => (
            <div
              key={remedy.id}
              className={`bg-white/5 rounded-xl p-4 border cursor-pointer transition-all ${
                selectedRemedy?.id === remedy.id 
                  ? 'border-[#00C2A8] bg-[#00C2A8]/10' 
                  : 'border-white/10 hover:border-[#00C2A8]/30'
              }`}
              onClick={() => setSelectedRemedy(remedy)}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${remedy.color} flex items-center justify-center text-xl`}>
                  {remedy.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{remedy.name}</h4>
                  <p className="text-sm text-gray-400">{remedy.frequency}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  selectedRemedy?.id === remedy.id ? 'bg-[#00C2A8]' : 'bg-white/30'
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Remedy Details */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-[#00C2A8] mb-4">
            {selectedRemedy ? selectedRemedy.name : 'Select a Remedy'}
          </h3>

          {selectedRemedy ? (
            <div className="space-y-6">
              {/* Method */}
              <div>
                <h4 className="font-medium text-white mb-2">Preparation Method</h4>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-gray-300">{selectedRemedy.method}</p>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-medium text-white mb-2">Key Benefits</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRemedy.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#00C2A8]/10 text-[#00C2A8] rounded-full text-sm border border-[#00C2A8]/20"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Frequency & Reason */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-white mb-2">Frequency</h4>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-gray-300">{selectedRemedy.frequency}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Health Benefits</h4>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <p className="text-gray-300 text-sm">{selectedRemedy.reason}</p>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-[#00C2A8]/10 rounded-lg p-4 border border-[#00C2A8]/20">
                <h4 className="font-medium text-[#00C2A8] mb-2">AI Health Tip</h4>
                <p className="text-sm text-gray-300">
                  This natural remedy complements your current health plan. Continue with prescribed medications and consult your healthcare provider before making significant changes.
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <p className="text-gray-400">Select a home remedy to view detailed instructions and benefits</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-[#00C2A8] mb-4">Remedy Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {medication.map((remedy) => (
            <div key={remedy.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${remedy.color} flex items-center justify-center`}>
                  <span className="text-sm">{remedy.icon}</span>
                </div>
                <span className="font-medium text-white">{remedy.name}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">When:</span>
                  <span className="text-white">{remedy.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Time:</span>
                  <span className="text-white">
                    {remedy.name === "Warm Water Hydration" ? "Morning" :
                     remedy.name === "Lemon Water" ? "Morning" :
                     remedy.name === "Ginger Tea" ? "After meals" : "Evening"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <div>
            <h4 className="font-medium text-yellow-400 mb-1">Important Note</h4>
            <p className="text-sm text-yellow-300/80">
              These home remedies are complementary approaches and should not replace medical treatment. 
              Always consult with your healthcare provider before starting any new health regimen, 
              especially if you have pre-existing conditions or are taking medications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medication;