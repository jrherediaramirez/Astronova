// src/components/BirdAnimation.jsx
import React, { useEffect, useState } from 'react';
import './BirdAnimation.css';

// Bird component with flapping animation
const Bird = ({ size, delay, duration, top, speed, color }) => {
  // Handle flapping animation
  const [wingPosition, setWingPosition] = useState(0);
  
  useEffect(() => {
    // Create a flapping effect by alternating wing positions
    const flapInterval = setInterval(() => {
      setWingPosition(prev => (prev + 1) % 3);
    }, 300 + Math.random() * 200); // Random flap speed
    
    return () => clearInterval(flapInterval);
  }, []);
  
  // Generate bird path based on wing position
  const getBirdPath = () => {
    switch(wingPosition) {
      case 0: // Wings level
        return "M0,7 L5,5 L10,7 L15,5 L20,7 L15,9 L10,7 L5,9 L0,7";
      case 1: // Wings up
        return "M0,7 L5,2 L10,7 L15,2 L20,7 L15,9 L10,7 L5,9 L0,7";
      case 2: // Wings down
        return "M0,7 L5,9 L10,7 L15,9 L20,7 L15,4 L10,7 L5,4 L0,7";
      default:
        return "M0,7 L5,5 L10,7 L15,5 L20,7 L15,9 L10,7 L5,9 L0,7";
    }
  };

  return (
    <div 
      className="bird" 
      style={{
        top: `${top}%`, 
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        '--bird-speed': speed,
        width: `${size}px`,
        height: `${size / 2}px`
      }}
    >
      <svg 
        viewBox="0 0 20 10" 
        preserveAspectRatio="xMidYMid meet"
        className="bird-svg"
      >
        <path 
          d={getBirdPath()} 
          fill={color} 
          className="bird-path"
        />
      </svg>
    </div>
  );
};

// Generate a random color in the specified range
const generateBirdColor = () => {
  // Generate colors in a blue-gray range to match the space theme
  const r = Math.floor(Math.random() * 30) + 10;
  const g = Math.floor(Math.random() * 30) + 10;
  const b = Math.floor(Math.random() * 30) + 40; // Blueish tint
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

// Main container component that manages multiple birds
const BirdAnimation = ({ count = 5, minSize = 15, maxSize = 35 }) => {
  const [birds, setBirds] = useState([]);
  
  // Generate birds with random properties
  useEffect(() => {
    const generateBirds = () => {
      return Array.from({ length: count }).map((_, i) => ({
        id: i,
        size: Math.floor(Math.random() * (maxSize - minSize)) + minSize,
        delay: Math.random() * 15, // Random delay up to 15s
        duration: Math.random() * 10 + 15, // Random duration between 15-25s
        top: Math.random() * 40 + 5, // Random position between 5-45% from top
        speed: Math.random() * 0.5 + 0.5, // Random speed multiplier
        color: generateBirdColor()
      }));
    };
    
    setBirds(generateBirds());
    
    // Periodically regenerate birds for continuous varied animation
    const regenerateInterval = setInterval(() => {
      const birdToReplace = Math.floor(Math.random() * count);
      
      setBirds(prevBirds => {
        const newBirds = [...prevBirds];
        newBirds[birdToReplace] = {
          ...newBirds[birdToReplace],
          delay: 0.1, // Short delay to appear soon
          top: Math.random() * 40 + 5, // New vertical position
          color: generateBirdColor(),
          size: Math.floor(Math.random() * (maxSize - minSize)) + minSize,
        };
        return newBirds;
      });
    }, 8000); // Every 8 seconds, replace a bird
    
    return () => clearInterval(regenerateInterval);
  }, [count, minSize, maxSize]);
  
  return (
    <div className="bird-container">
      {birds.map(bird => (
        <Bird 
          key={bird.id}
          size={bird.size}
          delay={bird.delay}
          duration={bird.duration}
          top={bird.top}
          speed={bird.speed}
          color={bird.color}
        />
      ))}
    </div>
  );
};

export default BirdAnimation;