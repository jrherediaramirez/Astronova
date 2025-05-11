import './index.css'; // Assuming this file might contain global styles or resets
import { useState } from 'react';

function MainMenu() {
  const [hoveredButton, setHoveredButton] = useState(null); // To track hovered button

  // User information - can be replaced with actual user data later
  const username = "Jesus"; // TODO: Replace with actual username from auth system

  // --- Event Handlers (Placeholder Functions) ---
  const handleProfileClick = () => {
    console.log("Profile button clicked");
    // TODO: Implement profile navigation or action (e.g., navigate('/profile'))
  };

  const handleStartClick = () => {
    console.log("Start button clicked");
    // TODO: Implement start game action (e.g., navigate('/game'))
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked");
    // TODO: Implement settings navigation or action (e.g., open settings modal)
  };

  const handleLeaderboardClick = () => {
    console.log("Leaderboard button clicked");
    // TODO: Implement leaderboard navigation or action (e.g., navigate('/leaderboard'))
  };

  // --- Styles ---
  const menuStyles = {
    backgroundImage: `url('/background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    position: 'relative', // For absolute positioning of icon buttons
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Prevents scrollbars if content slightly overflows
  };

  // Base style for icon images (Profile, Settings, Leaderboard)
  const baseIconImageStyle = {
    width: '80px',   // TODO: Adjust icon size as needed
    height: '80px',  // TODO: Adjust icon size as needed
    position: 'absolute',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out', // Smooth transition for hover
  };

  // Styles for the start button image
  const startButtonStyle = {
    width: '180px',  // TODO: Adjust button size as needed
    height: 'auto',
    cursor: 'pointer',
    marginTop: '20px', // Added some space above the start button
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out', // Smooth transition for hover
  };

  // Styles for the main character image
  const characterStyle = {
    width: '300px',  // TODO: Adjust character size as needed
    height: 'auto',

  };

  // Function to get dynamic style for hovered buttons
  // It scales the hovered button and slightly fades out others for focus.
  const getDynamicImageStyle = (buttonName) => ({
    transform: hoveredButton === buttonName ? 'scale(1.1)' : 'scale(1)',
    opacity: hoveredButton && hoveredButton !== buttonName ? 0.85 : 1,
  });

  return (
    <div style={menuStyles}>
      {/* Profile Button - Top Right */}
      <img
        src="/profile-button.png"
        alt="Profile"
        style={{
          ...baseIconImageStyle,
          top: '30px',
          right: '30px',
          ...getDynamicImageStyle('profile'), // Apply dynamic hover style
        }}
        onClick={handleProfileClick}
        onMouseEnter={() => setHoveredButton('profile')}
        onMouseLeave={() => setHoveredButton(null)}
        role="button" // Accessibility: informs that this image acts as a button
        tabIndex="0"  // Accessibility: makes the button focusable via keyboard
      />

      {/* Main Content - Center */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '90%', // Ensures content doesn't touch screen edges on smaller viewports
        boxSizing: 'border-box',
      }}>
        {/* Greeting and Quote */}
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)', // Responsive font size
          color: 'white',
          margin: '0 0 10px 0',
          fontWeight: '900',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)', // Shadow for better readability
        }}>
          Hey, {username}!
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)', // Responsive font size
          color: 'white',
          margin: '0 0 20px 0',
          fontStyle: 'italic',
          fontWeight: '300', // Lighter font weight for the quote
          maxWidth: '600px',
          lineHeight: '1.6',
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)', // Shadow for better readability
        }}>
          "You're not behind. You're just between planets." <span style={{ fontWeight: '700' }}>— Astronova</span>
        </p>

        {/* Main Character Image */}
        <img
          src="/main-character.png"
          alt="Astronova Character"
          style={characterStyle}
        />

        {/* Start Button - Using the image itself as a button */}
        <img
          src="/start-button.png"
          alt="Start Game" // More descriptive alt text
          style={{
            ...startButtonStyle,
            ...getDynamicImageStyle('start'), // Apply dynamic hover style
          }}
          onClick={handleStartClick}
          onMouseEnter={() => setHoveredButton('start')}
          onMouseLeave={() => setHoveredButton(null)}
          role="button"
          tabIndex="0"
        />
      </div>

      {/* Settings Button - Bottom Left */}
      <img
        src="/settings-button.png"
        alt="Settings"
        style={{
          ...baseIconImageStyle,
          bottom: '30px',
          left: '30px',
          ...getDynamicImageStyle('settings'), // Apply dynamic hover style
        }}
        onClick={handleSettingsClick}
        onMouseEnter={() => setHoveredButton('settings')}
        onMouseLeave={() => setHoveredButton(null)}
        role="button"
        tabIndex="0"
      />

      {/* Leaderboard Button - Bottom Right */}
      <img
        src="/leaderboard-button.png"
        alt="Leaderboard"
        style={{
          ...baseIconImageStyle,
          bottom: '30px',
          right: '30px',
          ...getDynamicImageStyle('leaderboard'), // Apply dynamic hover style
        }}
        onClick={handleLeaderboardClick}
        onMouseEnter={() => setHoveredButton('leaderboard')}
        onMouseLeave={() => setHoveredButton(null)}
        role="button"
        tabIndex="0"
      />
    </div>
  );
}

export default MainMenu;