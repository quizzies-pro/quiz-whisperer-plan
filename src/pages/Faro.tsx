import { useNavigate } from "react-router-dom";
import FaroHero from "@/components/faro/FaroHero";
import FaroTicker from "@/components/faro/FaroTicker";
import FaroDelivery from "@/components/faro/FaroDelivery";
import FaroNumbers from "@/components/faro/FaroNumbers";
import FaroTarget from "@/components/faro/FaroTarget";

const Faro = () => {
  const navigate = useNavigate();
  const handleCTA = () => navigate("/quiz/step/2");

  return (
    <div className="w-full min-h-screen overflow-x-hidden" style={{ background: '#ffffff' }}>
      <FaroHero onCTA={handleCTA} />
      <FaroTicker />
      <FaroDelivery />
      <FaroNumbers onCTA={handleCTA} />
      <FaroTarget onCTA={handleCTA} />
    </div>
  );
};

export default Faro;
