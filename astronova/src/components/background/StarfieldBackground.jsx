import { useEffect, useRef } from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = ({ 
  particleCount = 100, 
  speedFactor = 0.05,
  interactive = true,
  opacity = 0.7
}) => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5, // Size between 0.5 and 2.5
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: (Math.random() - 0.5) * speedFactor,
          opacity: Math.random() * opacity + 0.1,
        });
      }
    };
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Interactive - particles subtly drift toward mouse position
        if (interactive) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            particle.x += dx * 0.002;
            particle.y += dy * 0.002;
          }
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Call next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Track mouse position
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    
    // Initialize everything
    setCanvasSize();
    initParticles();
    animate();
    
    // Add event listeners
    window.addEventListener('resize', () => {
      setCanvasSize();
      initParticles();
    });
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [particleCount, speedFactor, interactive, opacity]);
  
  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default StarfieldBackground;