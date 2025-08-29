import VisionMissionValues from "./Vision_mission_values";
import MessageHOD from "./Message_HOD";

export default function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">About Page</h1>

      <VisionMissionValues />
      <MessageHOD />
    </div>
  );
}