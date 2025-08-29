import Newsletter from "../Newsletter";
import Image from "./images/home_background.jpg";
import { Link } from "react-router-dom";
import VisionMissionValues from "./Vision_mission_values";
import MessageHOD from "./Message_HOD";
const Home = () => {
  return (
    <>
      <section
  className="relative w-full h-96 bg-cover bg-center flex items-center justify-center text-center mt-10 z-0"
  style={{
    backgroundImage: `url(${Image})`,
  }}
>        
        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Welcome to Department of Biotechnology, 
          </h1>
           <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  IIT hyderabad
          </h1>
          
        </div>

          </section>
<section className="w-full px-8 py-16 bg-gray-50 space-y-10">
  {/* HOD Message full row */}
  <div className="w-full p-6">
    <MessageHOD />
  </div>

  {/* Vision / Mission / Values in one row */}
  <div className="w-full">
    <Vision_mission_values />
  </div>
</section>

    </>
  );
};

export default Home;





