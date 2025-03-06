
import { useEffect, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface ConnectionLineProps {
  from: Point;
  to: Point;
  delayMultiplier: number;
}

const ConnectionLine = ({ from, to, delayMultiplier }: ConnectionLineProps) => {
  const [particles, setParticles] = useState<{ id: number; offset: number; size: number; delay: number }[]>([]);
  
  useEffect(() => {
    // Create 3 particles per connection line
    const newParticles = Array(3)
      .fill(0)
      .map((_, i) => ({
        id: i,
        offset: Math.random() * 100,
        size: Math.random() * 0.5 + 0.5, // Random size between 0.5 and 1
        delay: i * 1.5, // Stagger the particle animations
      }));
    
    setParticles(newParticles);
  }, []);

  // Calculate a curved path from orchestrator to agent
  const getMidPoint = (p1: Point, p2: Point) => {
    // Calculate a midpoint with a slight curve
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2 - 30; // Curve upward
    return { x: midX, y: midY };
  };

  const midPoint = getMidPoint(from, to);
  const pathData = `M ${from.x} ${from.y + 10} Q ${midPoint.x} ${midPoint.y} ${to.x} ${to.y - 10}`;

  return (
    <>
      {/* Connection line */}
      <path
        d={pathData}
        className="agent-connection animate-draw-line"
        style={{ 
          animationDelay: `${delayMultiplier * 0.2}s`, 
          filter: 'drop-shadow(0 0 3px rgba(57, 255, 20, 0.5))'
        }}
        fill="none"
      />
      
      {/* Particle animations along the path */}
      {particles.map((particle) => (
        <g key={particle.id}>
          <circle
            r={3 * particle.size}
            className="agent-particle"
            style={{
              animation: 'particle-flow 4s infinite ease-out',
              animationDelay: `${particle.delay + delayMultiplier * 0.3}s`,
            }}
          >
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={pathData}
              rotate="auto"
              begin={`${particle.delay + delayMultiplier * 0.3}s`}
            />
          </circle>
        </g>
      ))}
    </>
  );
};

export default ConnectionLine;
