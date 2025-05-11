import { useEffect, useRef } from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = ({ 
  particleCount = 150, 
  speedFactor = 0.03,
  //interactive = false,
  opacity = 0.7,
  shootingStarFrequency = 0.00001,
  brushEffectIntensity = 0.8, // 0-1 how strong the brush effect should be
  noiseOpacity = 0.08, // 0-1 opacity of noise texture
}) => {
  const canvasRef = useRef(null);
  const noiseCanvasRef = useRef(null); // For the noise texture
  //const mousePosition = useRef({ x: 0, y: 0 });
  
  // Create noise texture once
  useEffect(() => {
    const createNoiseTexture = () => {
      const noiseCanvas = document.createElement('canvas');
      const width = window.innerWidth;
      const height = window.innerHeight;
      noiseCanvas.width = width;
      noiseCanvas.height = height;
      
      const ctx = noiseCanvas.getContext('2d');
      
      // Fill with off-white base
      ctx.fillStyle = 'rgb(252, 250, 245)';
      ctx.fillRect(0, 0, width, height);
      
      // Add coarse grain noise
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Create paper-like texture with varied granularity
      for (let i = 0; i < data.length; i += 4) {
        // Vary noise intensity for more natural paper texture
        const noise = Math.random() * 30 - 15;
        
        // Add paper fiber directionality (subtle streaks)
        const x = (i / 4) % width;
        const y = Math.floor((i / 4) / width);
        
        // Make horizontal and vertical fibers more likely
        const fiberStrength = Math.random() > 0.7 ? 
          (Math.sin(y * 0.5) * 8) : 
          (Math.cos(x * 0.5) * 8);
        
        // Combined noise effect
        const noiseValue = noise + fiberStrength;
        
        // Apply to RGB values
        data[i] = Math.min(255, Math.max(0, data[i] + noiseValue));
        data[i+1] = Math.min(255, Math.max(0, data[i+1] + noiseValue * 0.9));
        data[i+2] = Math.min(255, Math.max(0, data[i+2] + noiseValue * 0.8));
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add subtle watercolor-like blotches
      for (let i = 0; i < 20; i++) {
        ctx.globalAlpha = Math.random() * 0.04 + 0.01;
        
        // Random watercolor blotch positions
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 300 + 100;
        
        // Create organic shape
        ctx.beginPath();
        
        // Instead of perfect circle, create irregular shape
        const points = 6 + Math.floor(Math.random() * 5);
        for (let j = 0; j < points; j++) {
          const angle = (j / points) * Math.PI * 2;
          const jitter = (Math.random() * 0.3 + 0.85); // Size variation
          const px = x + Math.cos(angle) * radius * jitter;
          const py = y + Math.sin(angle) * radius * jitter;
          
          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            // Add bezier curve for organic feel
            const prevAngle = ((j - 1) / points) * Math.PI * 2;
            const cpRadius = radius * (Math.random() * 0.5 + 0.8);
            const cp1x = x + Math.cos(prevAngle + 0.2) * cpRadius;
            const cp1y = y + Math.sin(prevAngle + 0.2) * cpRadius;
            const cp2x = x + Math.cos(angle - 0.2) * cpRadius;
            const cp2y = y + Math.sin(angle - 0.2) * cpRadius;
            
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, px, py);
          }
        }
        ctx.closePath();
        
        // Random paint color - variations of light blues and purples
        const hue = Math.random() * 40 + 200; // blue to purple range
        const saturation = Math.random() * 20 + 5;
        const lightness = Math.random() * 20 + 75;
        ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        ctx.fill();
      }
      
      noiseCanvasRef.current = noiseCanvas;
    };
    
    createNoiseTexture();
  }, []);
  
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
    
    // Initialize brush textures for stars
    const brushPatterns = [];
    const createBrushPatterns = () => {
      // Create different brush stroke patterns for stars
      for (let i = 0; i < 5; i++) {
        const brushCanvas = document.createElement('canvas');
        brushCanvas.width = 30;
        brushCanvas.height = 30;
        const brushCtx = brushCanvas.getContext('2d');
        
        // Clear canvas
        brushCtx.clearRect(0, 0, 30, 30);
        
        // Create organic brush stroke instead of perfect circle
        brushCtx.globalAlpha = 1;
        
        // Random brush color within amber palette
        const baseColor = [
          Math.floor(Math.random() * 30) + 160, // R: 160-190
          Math.floor(Math.random() * 30) + 120, // G: 120-150
          Math.floor(Math.random() * 30) + 70,  // B: 70-100
        ];
        
        // Create base shape
        const centerX = 15;
        const centerY = 15;
        const maxRadius = 10;
        
        // Draw main brush stroke
        brushCtx.save();
        
        // Random rotation
        brushCtx.translate(centerX, centerY);
        brushCtx.rotate(Math.random() * Math.PI * 2);
        brushCtx.translate(-centerX, -centerY);
        
        // Gradient for more realistic brush look
        const gradient = brushCtx.createRadialGradient(
          centerX, centerY, 0,
          centerX, centerY, maxRadius
        );
        
        gradient.addColorStop(0, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 1)`);
        gradient.addColorStop(0.7, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0.8)`);
        gradient.addColorStop(1, `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, 0)`);
        
        brushCtx.fillStyle = gradient;
        
        // Draw brushstroke shape
        brushCtx.beginPath();
        
        // Create irregular ellipse
        const points = 8;
        const jitterAmount = brushEffectIntensity * 0.5;
        
        for (let j = 0; j < points; j++) {
          const angle = (j / points) * Math.PI * 2;
          // Horizontal stretching for brush effect
          const stretchX = 1.5 + Math.random() * brushEffectIntensity;
          const stretchY = 0.7 + Math.random() * brushEffectIntensity * 0.5;
          
          // Add jitter for more organic shape
          const jitterX = (Math.random() * jitterAmount * 2 - jitterAmount) * maxRadius;
          const jitterY = (Math.random() * jitterAmount * 2 - jitterAmount) * maxRadius;
          
          const px = centerX + Math.cos(angle) * maxRadius * stretchX + jitterX;
          const py = centerY + Math.sin(angle) * maxRadius * stretchY + jitterY;
          
          if (j === 0) {
            brushCtx.moveTo(px, py);
          } else {
            brushCtx.lineTo(px, py);
          }
        }
        
        brushCtx.closePath();
        brushCtx.fill();
        brushCtx.restore();
        
        // Add texture details
        brushCtx.globalAlpha = 0.4;
        for (let j = 0; j < 5; j++) {
          brushCtx.beginPath();
          
          // Small random brush marks
          const smallX = centerX + (Math.random() * 14 - 7);
          const smallY = centerY + (Math.random() * 14 - 7);
          const smallSize = Math.random() * 3 + 1;
          
          brushCtx.arc(smallX, smallY, smallSize, 0, Math.PI * 2);
          brushCtx.fillStyle = `rgba(${baseColor[0] + 20}, ${baseColor[1] + 20}, ${baseColor[2] + 10}, 0.4)`;
          brushCtx.fill();
        }
        
        // Add to patterns array
        brushPatterns.push(brushCanvas);
      }
    };
    
    createBrushPatterns();
    
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
          type: 'background',
          brushIndex: Math.floor(Math.random() * brushPatterns.length),
          rotation: Math.random() * Math.PI * 2,
          stretchFactor: Math.random() * 0.3 + 0.8 // Some stars appear more stretched
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
          jitterCycle: Math.random() * Math.PI * 2,
          brushIndex: Math.floor(Math.random() * brushPatterns.length),
          rotation: Math.random() * Math.PI * 2,
          stretchFactor: Math.random() * 0.4 + 0.7
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
          jitterCycle: Math.random() * Math.PI * 2,
          brushIndex: Math.floor(Math.random() * brushPatterns.length),
          rotation: Math.random() * Math.PI * 2,
          stretchFactor: Math.random() * 0.5 + 0.8
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
          brushIndex: Math.floor(Math.random() * brushPatterns.length),
          rotation: Math.random() * Math.PI * 2,
          stretchFactor: Math.random() * 0.4 + 1.0,
          // Bright stars can have a second brush pattern for more complexity
          secondaryBrushIndex: Math.floor(Math.random() * brushPatterns.length)
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
        color: '190, 150, 100', // Bright amber for shooting stars
        // Add brush parameters for shooting stars
        brushIndex: Math.floor(Math.random() * brushPatterns.length),
        stretchFactor: 1.5 + Math.random() * 0.5, // More elongated for shooting stars
        tailSegments: Math.floor(Math.random() * 3) + 3, // Number of brush strokes in tail
        tailWidthFactor: 0.6 + Math.random() * 0.4 // How quickly tail narrows
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
        /* if (interactive && particle.type !== 'background') {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            particle.x += dx * 0.002;
            particle.y += dy * 0.002;
            
            // Slightly change rotation for more organic feel
            particle.rotation += 0.01;
          }
        }

        */
        
        // Edge wrapping
        const buffer = particle.size * 2;
        if (particle.x < -buffer) particle.x = canvas.width + buffer;
        if (particle.x > canvas.width + buffer) particle.x = -buffer;
        if (particle.y < -buffer) particle.y = canvas.height + buffer;
        if (particle.y > canvas.height + buffer) particle.y = -buffer;
        
        // Draw particle based on type (using brush patterns)
        if (particle.type === 'brightStar') {
          // Twinkling effect
          particle.twinkleValue += particle.twinkleSpeed;
          const twinkleOpacity = particle.opacity * (0.5 + 0.5 * Math.sin(particle.twinkleValue));
          
          // Draw with brush pattern
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.scale(particle.stretchFactor, 1 / particle.stretchFactor); // Stretch effect
          
          // Draw main brush
          ctx.globalAlpha = twinkleOpacity;
          const scaleFactor = particle.size * 1.8;
          ctx.drawImage(
            brushPatterns[particle.brushIndex], 
            -scaleFactor, 
            -scaleFactor, 
            scaleFactor * 2, 
            scaleFactor * 2
          );
          
          // Draw secondary brush for more complex look
          ctx.globalAlpha = twinkleOpacity * 0.6;
          ctx.rotate(Math.PI / 3); // Rotate for different angle
          const secondaryScale = scaleFactor * 0.7;
          ctx.drawImage(
            brushPatterns[particle.secondaryBrushIndex],
            -secondaryScale,
            -secondaryScale,
            secondaryScale * 2,
            secondaryScale * 2
          );
          
          // Add a small glow
          ctx.globalAlpha = twinkleOpacity * 0.3;
          const gradient = ctx.createRadialGradient(
            0, 0, 0,
            0, 0, scaleFactor * 3
          );
          
          const color = particle.color;
          gradient.addColorStop(0, `rgba(${color}, 0.6)`);
          gradient.addColorStop(1, `rgba(${color}, 0)`);
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(0, 0, scaleFactor * 3, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.restore();
        } else {
          // Regular stars and dust use simpler brush pattern
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.rotation);
          ctx.scale(particle.stretchFactor, 1 / particle.stretchFactor); // Stretch effect
          
          ctx.globalAlpha = particle.opacity;
          const scaleFactor = particle.size * 1.5;
          ctx.drawImage(
            brushPatterns[particle.brushIndex], 
            -scaleFactor, 
            -scaleFactor, 
            scaleFactor * 2, 
            scaleFactor * 2
          );
          
          ctx.restore();
        }
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
        
        // Draw the shooting star with brush effect
        ctx.save();
        
        // Calculate angle from speed
        const angle = Math.atan2(star.speedY, star.speedX);
        
        // Draw tail with multiple brush strokes
        const tailSegments = star.tailSegments;
        const baseBrushSize = star.size * 2;
        
        for (let j = 0; j < tailSegments; j++) {
          const segmentPosition = j / tailSegments;
          const segmentX = star.x - star.speedX * star.tailLength * segmentPosition;
          const segmentY = star.y - star.speedY * star.tailLength * segmentPosition;
          
          // Gradually reduce opacity and size along tail
          const segmentOpacity = star.life * (1 - segmentPosition * 0.8);
          const segmentSize = baseBrushSize * (1 - segmentPosition * star.tailWidthFactor);
          
          ctx.save();
          ctx.translate(segmentX, segmentY);
          ctx.rotate(angle);
          ctx.scale(1.5, 1); // Elongate horizontally
          
          ctx.globalAlpha = segmentOpacity;
          ctx.drawImage(
            brushPatterns[star.brushIndex],
            -segmentSize,
            -segmentSize / 2,
            segmentSize * 2,
            segmentSize
          );
          
          ctx.restore();
        }
        
        // Draw the star head
        ctx.translate(star.x, star.y);
        ctx.rotate(angle);
        ctx.scale(star.stretchFactor, 1);
        
        ctx.globalAlpha = star.life;
        ctx.drawImage(
          brushPatterns[star.brushIndex],
          -baseBrushSize * 1.2,
          -baseBrushSize / 2,
          baseBrushSize * 2.4,
          baseBrushSize
        );
        
        // Add a small glow at the head
        ctx.globalAlpha = star.life * 0.6;
        const gradient = ctx.createRadialGradient(
          0, 0, 0,
          0, 0, baseBrushSize * 2
        );
        
        const starColor = star.color || '190, 150, 100';
        gradient.addColorStop(0, `rgba(${starColor}, 0.8)`);
        gradient.addColorStop(1, `rgba(${starColor}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, baseBrushSize * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      
      // Apply noise texture on top (if available)
      if (noiseCanvasRef.current) {
        ctx.globalAlpha = noiseOpacity;
        ctx.globalCompositeOperation = 'overlay';
        ctx.drawImage(noiseCanvasRef.current, 0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
      }
      
      // Call next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Track mouse position
    /*
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    */
    
    // Initialize everything
    setCanvasSize();
    initParticles();
    animate();
    
    // Add event listeners
    window.addEventListener('resize', () => {
      setCanvasSize();
      initParticles();
    });

    /*
    
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    */
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setCanvasSize);

      /*
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
        */
    };
  }, [particleCount, speedFactor, opacity, shootingStarFrequency, brushEffectIntensity, noiseOpacity]);
  
  return <canvas ref={canvasRef} className="starfield-canvas" />;
};

export default StarfieldBackground;