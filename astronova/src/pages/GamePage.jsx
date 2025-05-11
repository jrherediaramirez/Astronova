// src/GamePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const pageStyle = {
  padding: '30px',
  color: 'white',
  textAlign: 'center',
  backgroundImage: 'url("/deep-space-bg.jpg")', // Optional: add a space background image to your public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundColor: '#0c1427', // Fallback very dark blue
  minHeight: '100vh',
  fontFamily: '"Orbitron", sans-serif', // A more sci-fi font (add to your CSS or index.html if needed)
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const titleStyle = {
  fontSize: 'clamp(32px, 6vw, 56px)',
  textShadow: '0 0 10px #00d8ff, 0 0 20px #00d8ff', // Neon blue glow
  marginBottom: '20px',
};

const messageStyle = {
  fontSize: 'clamp(18px, 3vw, 24px)',
  marginBottom: '30px',
  fontStyle: 'italic',
  color: '#e0e0e0',
  maxWidth: '600px',
};

const buttonStyle = {
  padding: '15px 30px',
  backgroundColor: '#ff6ac1', // Cosmic pink
  color: 'white',
  border: '2px solid #ff99d6',
  borderRadius: '50px', // Pill shape
  cursor: 'pointer',
  fontSize: '20px',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  boxShadow: '0 0 15px #ff6ac1, 0 0 25px #ff6ac1 inset',
  transition: 'all 0.3s ease',
  marginBottom: '20px',
};

const countdownStyle = {
  fontSize: '48px',
  fontWeight: 'bold',
  color: '#70f8ff', // Light cyan
  textShadow: '0 0 8px #70f8ff',
};

const linkStyle = {
  color: '#70f8ff',
  textDecoration: 'none',
  marginTop: '40px',
  padding: '10px 15px',
  border: '1px solid #70f8ff',
  borderRadius: '4px',
  display: 'inline-block',
  transition: 'background-color 0.3s ease, color 0.3s ease',
};

function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setGameStarted(true);
      setCountdown(null); // Clear countdown
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleStartGame = () => {
    console.log("Preparing for hyperjump!");
    setCountdown(3); // Start 3-second countdown
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Astronova Missions</h1>
      {!gameStarted && countdown === null && (
        <>
          <p style={messageStyle}>
            "Brave astronaut, the cosmos awaits your command. Are you ready to chart new galaxies?"
          </p>
          <button
            onClick={handleStartGame}
            style={buttonStyle}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Engage Hyperdrive!
          </button>
        </>
      )}

      {countdown !== null && (
        <div>
          <p style={messageStyle}>Launching in...</p>
          <p style={countdownStyle}>{countdown}</p>
        </div>
      )}

      {gameStarted && (
        <div>
          <p style={messageStyle}>
            "We have liftoff! Your cosmic adventure begins now... navigate wisely."
          </p>
          <p style={{ fontSize: '20px', color: '#f0f0f0' }}>
            (Here, your main game components and logic would render.)
          </p>
        </div>
      )}
      <Link
        to="/"
        style={linkStyle}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#70f8ff'; e.currentTarget.style.color = '#0c1427';}}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#70f8ff';}}
      >
        Return to Starbase (Main Menu)
      </Link>
    </div>
  );
}

export default GamePage;