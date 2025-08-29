import { Lightbulb, Rocket, Gem } from "lucide-react";

export default function Vision_mission_values() {
  return (
    <div className="grid grid-cols-1  md:grid-cols-3 gap-8 text-center">

      <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <Lightbulb className="mx-auto w-12 h-12 text-yellow-500" />
        <h2 className="text-xl font-semibold mt-4">Vision</h2>
        <p className="text-gray-600 mt-2">
                     Our vision is to foster a world-class teaching environment and state-of
the art facilities for cutting-edge biotechnology research to drive an
 academic space that is dedicated to cultivating innovative opportunities
 and systemwide collaboration for discovery beyond boundaries.
                </p>
      </div>

      {/* Mission */}
      <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <Rocket className="mx-auto w-12 h-12 text-blue-500" />
        <h2 className="text-xl font-semibold mt-4">Mission</h2>
        <p className="text-gray-600 mt-2">
                     Our mission is to accelerate as an outstanding educational hub with an
 equal emphasis on excellence in teaching, research, and community
 engagement. We are committed to the utmost professional and academic
 standards to ensure intellectual excellence and to create a global impact
 by transmitting advanced knowledge
                </p>
      </div>

      {/* Values */}
      <div className="p-6 rounded-2xl shadow-md hover:shadow-lg transition">
        <Gem className="mx-auto w-12 h-12 text-green-500" />
        <h2 className="text-xl font-semibold mt-4">Values</h2>
        <p className="text-gray-600 mt-2">
                     We aspire to value the highest academic and professional integrity,
 scientific ethics, and excellence in teaching and research to realize the full potential of biotechnology. We promote equality and empower our
 students, staff, and faculty to achieve intellectual rigor, academic
 leadership, and global recognition to best serve the nation and society.
                 </p>
      </div>
    </div>
  );
}