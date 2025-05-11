import { useEffect, useRef } from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = ({ 
  particleCount = 150, 
  speedFactor = 0.03,
  interactive = true,
  opacity = 0.7,
  shootingStarFrequency = 0.0001,
}) => {
  const canvasRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let shootingStars = [];
    
    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialize particles with your amber/gold color palette
    const initParticles = () => {
      particles = [];
      
      // Stationary background stars
      for (let i = 0; i < particleCount * 0.4; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 0.8 + 0.2, // Very small
          // Completely stationary
          speedX: 0,
          speedY: 0,
          opacity: Math.random() * 0.3 + 0.1, // Faint
          // Gold/amber color with slight variations
          color: '161, 123, 75', // Base amber color #a17b4b
          type: 'background'
        });
      }
      
      // Small dust particles - very slow
      for (let i = 0; i < particleCount * 0.3; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Variation of amber colors
        const colors = [
          '161, 123, 75', // Base amber #a17b4b
          '190, 150, 100', // Lighter amber
          '130, 100, 60'   // Darker amber
        ];
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1 + 0.3,
          // Very slow movement
          speedX: Math.cos(angle) * (Math.random() * 0.1) * speedFactor * 0.2,
          speedY: Math.sin(angle) * (Math.random() * 0.1) * speedFactor * 0.2,
          opacity: Math.random() * 0.4 + 0.2,
          color: colors[colorIndex],
          type: 'dust',
          jitterFactor: Math.random() * 0.01,
          jitterCycle: Math.random() * Math.PI * 2
        });
      }
      
      // Medium stars
      for (let i = 0; i < particleCount * 0.2; i++) {
        const angle = Math.random() * Math.PI * 2;
        // More amber variations
        const colors = [
          '161, 123, 75',   // Base amber #a17b4b
          '180, 110, 60',   // Redder amber
          '170, 130, 80'    // Yellower amber
        ];
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 1,
          speedX: Math.cos(angle) * (Math.random() * 0.3) * speedFactor * 0.5,
          speedY: Math.sin(angle) * (Math.random() * 0.3) * speedFactor * 0.5,
          opacity: Math.random() * 0.6 + 0.3,
          color: colors[colorIndex],
          type: 'star',
          jitterFactor: Math.random() * 0.01,
          jitterCycle: Math.random() * Math.PI * 2
        });
      }
      
      // Few bright stars
      for (let i = 0; i < particleCount * 0.1; i++) {
        const angle = Math.random() * Math.PI * 2;
        const colors = [
          '190, 150, 100',  // Bright amber
          '200, 160, 110',  // Very bright amber
          '210, 170, 120'   // Almost white-amber
        ];
        const colorIndex = Math.floor(Math.random() * colors.length);
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1.5,
          speedX: Math.cos(angle) * (Math.random() * 0.2) * speedFactor * 0.3,
          speedY: Math.sin(angle) * (Math.random() * 0.2) * speedFactor * 0.3,
          opacity: Math.random() * 0.4 + 0.6,
          color: colors[colorIndex],
          type: 'brightStar',
          twinkleSpeed: Math.random() * 0.005 + 0.0005, // Half as fast
          twinkleValue: Math.random() * Math.PI * 2,
        });
      }
    };
    
    // Create a shooting star with golden color
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let startX, startY;
      let angle;
      
      switch(side) {
        case 0: // top
          startX = Math.random() * canvas.width;
          startY = 0;
          angle = (Math.random() * 0.5 + 0.25) * Math.PI;
          break;
        case 1: // right
          startX = canvas.width;
          startY = Math.random() * canvas.height;
          angle = (Math.random() * 0.5 + 0.5) * Math.PI;
          break;
        case 2: // bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height;
          angle = (Math.random() * 0.5 + 1.25) * Math.PI;
          break;
        case 3: // left 
          startX = 0;
          startY = Math.random() * canvas.height;
          angle = (Math.random() * 0.5 + 1.75) * Math.PI;
          break;
      }
      
      const speed = Math.random() * 6 + 4;
      
      shootingStars.push({
        x: startX,
        y: startY,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        size: Math.random() * 2 + 1,
        tailLength: Math.random() * 80 + 30,
        opacity: 1,
        life: 1,
        fadeSpeed: Math.random() * 0.02 + 0.01,
        color: '190, 150, 100' // Bright amber for shooting stars
      });
    };
    
    // Animation function
    const animate = () => {
      // Use your deep blue color for background with proper fade
      ctx.fillStyle = 'rgba(2, 34, 53, 0.5)'; // #022235 with quick fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Randomly create shooting stars
      if (Math.random() < shootingStarFrequency) {
        createShootingStar();
      }
      
      // Update and draw particles
      particles.forEach(particle => {
        // Add jitter for subtle movement
        if (particle.jitterFactor) {
          particle.jitterCycle += 0.01;
          particle.x += Math.sin(particle.jitterCycle) * particle.jitterFactor;
          particle.y += Math.cos(particle.jitterCycle) * particle.jitterFactor;
        }
        
        // Move the particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Interactive - particles drift toward mouse (only for non-background stars)
        if (interactive && particle.type !== 'background') {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            particle.x += dx * 0.002;
            particle.y += dy * 0.002;
          }
        }
        
        // Edge wrapping
        const buffer = particle.size * 2;
        if (particle.x < -buffer) particle.x = canvas.width + buffer;
        if (particle.x > canvas.width + buffer) particle.x = -buffer;
        if (particle.y < -buffer) particle.y = canvas.height + buffer;
        if (particle.y > canvas.height + buffer) particle.y = -buffer;
        
        // Draw particle based on type
        ctx.beginPath();
        
        if (particle.type === 'brightStar') {
          // Twinkling effect
          particle.twinkleValue += particle.twinkleSpeed;
          const twinkleOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.twinkleValue));
          
          // Glow effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 2
          );
          
          const color = particle.color;
          gradient.addColorStop(0, `rgba(${color}, ${twinkleOpacity})`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        } else {
          // Regular stars and dust
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          const color = particle.color;
          ctx.fillStyle = `rgba(${color}, ${particle.opacity})`;
        }
        
        ctx.fill();
      });
      
      // Update and draw shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        // Move the shooting star
        star.x += star.speedX;
        star.y += star.speedY;
        
        // Decrease life
        star.life -= star.fadeSpeed;
        
        // Remove if out of screen or life is over
        if (star.x < -50 || star.x > canvas.width + 50 || 
            star.y < -50 || star.y > canvas.height + 50 || 
            star.life <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        
        // Draw the shooting star with amber color
        ctx.beginPath();
        const tailGradient = ctx.createLinearGradient(
          star.x, star.y, 
          star.x - star.speedX * star.tailLength, 
          star.y - star.speedY * star.tailLength
        );
        
        const starColor = star.color || '190, 150, 100';
        tailGradient.addColorStop(0, `rgba(${starColor}, ${star.life})`);
        tailGradient.addColorStop(0.4, `rgba(${starColor}, ${star.life * 0.6})`);
        tailGradient.addColorStop(1, 'rgba(161, 123, 75, 0)');
        
        ctx.strokeStyle = tailGradient;
        ctx.lineWidth = star.size;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.speedX * star.tailLength,
          star.y - star.speedY * star.tailLength
        );
        ctx.stroke();
        
        // Draw the star head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor}, ${star.life})`;
        ctx.fill();
      }
      
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
  }, [particleCount, speedFactor, interactive, opacity, shootingStarFrequency]);
  
  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default StarfieldBackground;