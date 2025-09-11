import { useState } from "react";

export default function Collaborations() {
  const collaborations = {
    national: [
     
    ],
    international: [
   
    ],
    industrial: [
      
    ],
  };

  const [activeTab, setActiveTab] = useState("national");

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Collaborations</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {Object.keys(collaborations).map((type) => (
          <button
            key={type}
            onClick={() => setActiveTab(type)}
            className={`px-4 py-2 rounded capitalize ${
              activeTab === type
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>


      <ul className="list-disc ml-6 space-y-2">
        {collaborations[activeTab].map((collab, idx) => (
          <li key={idx}>{collab}</li>
        ))}
      </ul>
    </div>
  );
}
