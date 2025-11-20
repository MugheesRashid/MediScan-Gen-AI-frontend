import React, { useState } from "react";

const LifestyleTab = ({ data }) => {
  const [activeSection, setActiveSection] = useState('dailyRoutine');

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'dailyRoutine', label: 'Daily Routine' },
          { id: 'nutrition', label: 'Nutrition Plan' },
          { id: 'exercise', label: 'Exercise' },
          { id: 'monitoring', label: 'Health Monitoring' }
        ].map(section => (
          <button
            key={section.id}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              activeSection === section.id 
                ? 'bg-[#00C2A8] text-[#0A1A2F]' 
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Daily Routine */}
      {activeSection === 'dailyRoutine' && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-4">Daily Routine Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.lifestyle.dailyRoutine.map((routine, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#00C2A8]/30 transition-all">
                  <h3 className="font-bold text-[#00C2A8] mb-3">{routine.time}</h3>
                  <ul className="space-y-2">
                    {routine.activities.map((activity, activityIndex) => (
                      <li key={activityIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Schedule
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Weekly Schedule Template</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400">Time</th>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <th key={day} className="text-center py-3 text-gray-400">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: '7:00 AM', activity: 'Morning Walk + Sunlight' },
                    { time: '12:00 PM', activity: 'Exercise Session' },
                    { time: '6:00 PM', activity: 'Light Dinner' },
                    { time: '10:00 PM', activity: 'Sleep Routine' }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-3 text-gray-300">{row.time}</td>
                      {[...Array(7)].map((_, dayIndex) => (
                        <td key={dayIndex} className="text-center py-3">
                          <div className="bg-[#00C2A8]/10 text-[#00C2A8] text-xs px-2 py-1 rounded">
                            {row.activity.split(' ')[0]}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      )}

      {/* Nutrition Plan */}
      {activeSection === 'nutrition' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Foods to Increase */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4 text-green-400">Foods to Increase</h3>
              <div className="space-y-4">
                {data.nutrition.increase.map((category, index) => (
                  <div key={index} className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <h4 className="font-bold text-green-400 mb-2">{category.category}</h4>
                    <p className="text-sm text-gray-300 mb-2">{category.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Foods to Decrease */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold mb-4 text-red-400">Foods to Decrease</h3>
              <div className="space-y-4">
                {data.nutrition.decrease.map((category, index) => (
                  <div key={index} className="bg-red-500/10 rounded-lg p-4 border border-red-500/20">
                    <h4 className="font-bold text-red-400 mb-2">{category.category}</h4>
                    <p className="text-sm text-gray-300 mb-2">{category.reason}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item, itemIndex) => (
                        <span key={itemIndex} className="px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Supplements */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Supplement Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.nutrition.supplements.filter(d=> d.name !== "-").map((supplement, index) => (
                <div key={index} className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                  <h4 className="font-bold text-blue-400 mb-2">{supplement.name}</h4>
                  <div className="text-sm space-y-1">
                    <div className="text-gray-300">Dosage: {supplement.dosage}</div>
                    <div className="text-gray-300">Timing: {supplement.timing}</div>
                    <div className="text-gray-300">Duration: {supplement.duration}</div>
                  </div>
                </div>
              ))}
              {data.nutrition.supplements.filter(d=> d.name !== "-").length === 0 && (
                <div className="text-gray-400 col-span-3 text-center">No supplements recommended at this time.</div>
              )}
            </div>
          </div>

          {/* Sample Meal Plan
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Sample Daily Meal Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { meal: "Breakfast", foods: ["Oatmeal with berries", "1 boiled egg", "Green tea"] },
                { meal: "Lunch", foods: ["Grilled chicken salad", "Quinoa", "Mixed vegetables"] },
                { meal: "Dinner", foods: ["Baked salmon", "Steamed broccoli", "Sweet potato"] },
                { meal: "Snacks", foods: ["Handful of nuts", "Greek yogurt", "Apple"] }
              ].map((meal, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <h4 className="font-bold text-[#00C2A8] mb-3">{meal.meal}</h4>
                  <ul className="space-y-2 text-sm">
                    {meal.foods.map((food, foodIndex) => (
                      <li key={foodIndex} className="flex items-center">
                        <div className="w-1 h-1 rounded-full bg-[#00C2A8] mr-2"></div>
                        <span className="text-gray-300">{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}

      {/* Exercise */}
      {activeSection === 'exercise' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.lifestyle.exercise.map((exercise, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 text-[#00C2A8]">{exercise.type} Training</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Frequency:</span>
                    <span className="font-medium">{exercise.frequency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="font-medium">{exercise.duration}</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Examples:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exercise.examples.map((example, exIndex) => (
                        <span key={exIndex} className="px-2 py-1 bg-[#00C2A8]/10 text-[#00C2A8] rounded-full text-xs">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Exercise Schedule
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Weekly Exercise Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-gray-400">Day</th>
                    <th className="text-left py-3 text-gray-400">Morning (7-8 AM)</th>
                    <th className="text-left py-3 text-gray-400">Evening (6-7 PM)</th>
                    <th className="text-left py-3 text-gray-400">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { day: 'Monday', morning: 'Brisk Walking', evening: 'Strength Training', duration: '60 min' },
                    { day: 'Tuesday', morning: 'Yoga', evening: 'Rest', duration: '30 min' },
                    { day: 'Wednesday', morning: 'Cycling', evening: 'Strength Training', duration: '75 min' },
                    { day: 'Thursday', morning: 'Rest', evening: 'Swimming', duration: '45 min' },
                    { day: 'Friday', morning: 'Brisk Walking', evening: 'Strength Training', duration: '60 min' },
                    { day: 'Saturday', morning: 'Hiking', evening: 'Rest', duration: '90 min' },
                    { day: 'Sunday', morning: 'Rest', evening: 'Light Stretching', duration: '20 min' }
                  ].map((day, index) => (
                    <tr key={index} className="border-b border-white/5">
                      <td className="py-3 font-medium">{day.day}</td>
                      <td className="py-3 text-gray-300">{day.morning}</td>
                      <td className="py-3 text-gray-300">{day.evening}</td>
                      <td className="py-3 text-[#00C2A8] font-medium">{day.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
        </div>
      )}

      {/* Health Monitoring */}
      {activeSection === 'monitoring' && (
        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Health Monitoring Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.monitoring.map((test, index) => (
                <div key={index} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#00C2A8]/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-[#00C2A8]">{test.test}</h4>
                    <span className="px-2 py-1 bg-[#00C2A8]/10 text-[#00C2A8] rounded-full text-xs">
                      {test.frequency}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Target:</span>
                      <span className="font-medium">{test.target}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next Due:</span>
                      <span className="font-medium">
                        {new Date(Date.now() + (test.frequency.includes('month') ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Tracking
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold mb-4">Progress Tracking</h3>
            <div className="space-y-4">
              {[
                { metric: "Weight", current: "185 lbs", target: "175 lbs", progress: 65 },
                { metric: "Blood Pressure", current: "130/85", target: "120/80", progress: 40 },
                { metric: "Resting Heart Rate", current: "72 bpm", target: "65 bpm", progress: 55 },
                { metric: "Daily Steps", current: "7,500", target: "10,000", progress: 75 }
              ].map((track, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{track.metric}</span>
                    <span className="text-gray-400">{track.current} → {track.target}</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-[#00C2A8] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${track.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default LifestyleTab