
import { useEffect, useState } from "react";
import AgentNode from "./AgentNode";
import ConnectionLine from "./ConnectionLine";

interface AgentPosition {
  id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  delayMultiplier: number;
}

const AgentNetwork = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate positions based on window size
  const centerX = windowSize.width / 2;
  const topY = windowSize.height * 0.15;
  const bottomY = windowSize.height * 0.65;
  const sideSpacing = windowSize.width > 1200 ? 280 : windowSize.width > 768 ? 200 : 150;

  const orchestratorPosition = { x: centerX, y: topY };

  const agentPositions: AgentPosition[] = [
    {
      id: "orchestrator",
      title: "Orchestrator Agent",
      description: "Coordinates tasks and delegates subtasks to other agents",
      x: orchestratorPosition.x,
      y: orchestratorPosition.y,
      delayMultiplier: 0,
    },
    {
      id: "resource",
      title: "Resource Agent",
      description: "Manages resource allocation and provider selection",
      x: centerX - sideSpacing,
      y: bottomY,
      delayMultiplier: 1,
    },
    {
      id: "execution",
      title: "Execution Agent",
      description: "Handles task execution and monitors progress",
      x: centerX - sideSpacing / 3,
      y: bottomY,
      delayMultiplier: 2,
    },
    {
      id: "verification",
      title: "Verification Agent",
      description: "Validates task results and ensures compliance",
      x: centerX + sideSpacing / 3,
      y: bottomY,
      delayMultiplier: 3,
    },
    {
      id: "feedback",
      title: "Feedback Agent",
      description: "Collects feedback and optimizes future tasks",
      x: centerX + sideSpacing,
      y: bottomY,
      delayMultiplier: 4,
    },
  ];

  // Generate connection lines from orchestrator to each agent
  const connections = agentPositions
    .filter((agent) => agent.id !== "orchestrator")
    .map((agent) => ({
      from: orchestratorPosition,
      to: { x: agent.x, y: agent.y },
      id: `${orchestratorPosition.x},${orchestratorPosition.y}-${agent.x},${agent.y}`,
      delayMultiplier: agent.delayMultiplier,
    }));

  return (
    <div className="relative w-full h-full bg-diagram-dark overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-diagram-dark to-diagram-darker" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(57, 255, 20, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {isLoaded && connections.map((connection) => (
          <ConnectionLine
            key={connection.id}
            from={connection.from}
            to={connection.to}
            delayMultiplier={connection.delayMultiplier}
          />
        ))}
      </svg>

      {/* Agent nodes */}
      {agentPositions.map((agent) => (
        <AgentNode
          key={agent.id}
          id={agent.id}
          title={agent.title}
          description={agent.description}
          x={agent.x}
          y={agent.y}
          isMain={agent.id === "orchestrator"}
          delayMultiplier={agent.delayMultiplier}
          isVisible={isLoaded}
        />
      ))}

      {/* Diagram title */}
      <div 
        className={`absolute top-5 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ transitionDelay: '200ms' }}
      >
        <div className="text-xs font-medium text-neon-green/60 uppercase tracking-widest mb-1">
          Advanced System Architecture
        </div>
        <h1 className="text-2xl font-light text-white/90 tracking-wide">
          Neon Orchestrator <span className="text-neon-green font-normal">Network</span>
        </h1>
      </div>
    </div>
  );
};

export default AgentNetwork;
