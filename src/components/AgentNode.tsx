
import { FiActivity, FiAperture, FiBox, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";

interface AgentNodeProps {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  isMain?: boolean;
  delayMultiplier: number;
  isVisible: boolean;
}

const AgentNode = ({
  id,
  title,
  description,
  x,
  y,
  isMain = false,
  delayMultiplier,
  isVisible,
}: AgentNodeProps) => {
  const getIcon = () => {
    switch (id) {
      case "orchestrator":
        return <FiAperture className="w-8 h-8" />;
      case "resource":
        return <FiBox className="w-8 h-8" />;
      case "execution":
        return <FiActivity className="w-8 h-8" />;
      case "verification":
        return <FiCheckCircle className="w-8 h-8" />;
      case "feedback":
        return <FiMessageCircle className="w-8 h-8" />;
      default:
        return <FiAperture className="w-8 h-8" />;
    }
  };

  return (
    <motion.div
      className={`absolute glass-card ${
        isMain ? "w-64 h-48" : "w-56 h-44"
      } flex flex-col items-center justify-center p-4 select-none`}
      style={{
        left: x - (isMain ? 128 : 112),
        top: y - (isMain ? 96 : 88),
        opacity: 0,
        z-index: 10,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      transition={{
        duration: 0.7,
        delay: 0.2 + delayMultiplier * 0.15,
        ease: [0.21, 0.45, 0.35, 1.0],
      }}
    >
      <div 
        className={`rounded-full p-3 mb-3 ${isMain ? 'bg-neon-green/10' : 'bg-neon-green/5'} text-neon-green animate-pulse-neon`}
      >
        {getIcon()}
      </div>
      <h3 className="text-white text-lg font-medium mb-1">{title}</h3>
      <p className="text-white/60 text-xs text-center">{description}</p>
      
      {/* Subtle border glow effect */}
      <div 
        className={`absolute inset-0 rounded-2xl pointer-events-none ${isMain ? 'neon-border' : ''}`}
        style={{
          opacity: isMain ? 0.8 : 0.5,
        }}
      />
    </motion.div>
  );
};

export default AgentNode;
