import { useState } from "react";

import UG from "./UG1";
import PG from "./PG1";
import PhD from "./PhD";

export default function Programs() {
  const [activeTab, setActiveTab]  = useState("ug");
 return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Academic Programs</h1>
      <div className="flex gap-4 mb-6">
      <button onClick={() => setActiveTab("ug")} className={`px-4 py-2 rounded-lg ${ activeTab=== "ug"
      ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`} >
          Undergraduate (UG)
      </button>
      <button onClick={() => setActiveTab("pg")} className={`px-4 py-2 rounded-lg ${ activeTab === "pg"
        ?  "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300" }`}>
            Postgraduate (PG)
      </button>
      <button onClick={() => setActiveTab("phd")} className={`px-4 py-2 rounded-lg ${activeTab === "phd" 
        ? "bg-purple-600 text-white" : "bg-gray-200 hover:bg-gray-300" }`}> Ph.D. </button>
    </div>
      
      <div className="mt-6">
        {activeTab === "ug" && <UG />}
        {activeTab === "pg" && <PG />}
        {activeTab === "phd" && <PhD />}
      </div>
    </div>
  );
}
