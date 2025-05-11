import '../index.css';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

function MainMenu() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const { userData, logout } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const username = userData ? userData.firstName : "User";

  // --- Event Handlers (Updated for navigation) ---
  const handleProfileClick = () => {
    console.log("Profile button clicked - navigating to /profile");
    navigate('/profile'); // Navigate to the profile page
  };

  const handleStartClick = () => {
    console.log("Start button clicked - navigating to /game");
    navigate('/game'); // Navigate to the game page (or your chosen path)
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked - navigating to /settings");
    navigate('/settings'); // Navigate to the settings page
  };

  const handleLeaderboardClick = () => {
    console.log("Leaderboard button clicked - navigating to /leaderboard");
    navigate('/leaderboard'); // Navigate to the leaderboard page
  };

  const handleLogout = async () => {
    try {
      await logout();
      // navigate('/login'); // ProtectedRoute will handle redirection
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // --- Styles ---
  // (Your existing styles: menuStyles, baseIconImageStyle, startButtonStyle, characterStyle, getDynamicImageStyle)
  // Ensure these styles are defined as before. For brevity, I'm omitting them here.
  // For example:
  const menuStyles = {
    backgroundImage: `url('/background.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const baseIconImageStyle = {
    width: '80px',
    height: '80px',
    position: 'absolute',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
  };
  
  const getDynamicImageStyle = (buttonName) => ({
    transform: hoveredButton === buttonName ? 'scale(1.1)' : 'scale(1)',
    opacity: hoveredButton && hoveredButton !== buttonName ? 0.85 : 1,
  });

  const startButtonStyle = {
    width: '180px',
    height: 'auto',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
  };

  const characterStyle = {
    width: '300px',
    height: 'auto',
  };


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
          ...getDynamicImageStyle('profile'),
        }}
        onClick={handleProfileClick} // Updated
        onMouseEnter={() => setHoveredButton('profile')}
        onMouseLeave={() => setHoveredButton(null)}
        role="button"
        tabIndex="0"
      />

      {/* Logout Button (Example) */}
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          padding: '10px 15px',
          backgroundColor: 'rgba(255, 82, 82, 0.8)', // Example style
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 0, 0, 1)'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 82, 82, 0.8)'}
      >
        Logout
      </button>

      {/* Main Content - Center */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        maxWidth: '90%',
        boxSizing: 'border-box',
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 48px)',
          color: 'white',
          margin: '0 0 10px 0',
          fontWeight: '900',
          textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
        }}>
          Hey, {username}!
        </h1>

        <p style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'white',
          margin: '0 0 20px 0',
          fontStyle: 'italic',
          fontWeight: '300',
          maxWidth: '600px',
          lineHeight: '1.6',
          textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
        }}>
          "You're not behind. You're just between planets." <span style={{ fontWeight: '700' }}>— Astronova</span>
        </p>

        <img
          src="/main-character.png"
          alt="Astronova Character"
          style={characterStyle}
        />

        <img
          src="/start-button.png"
          alt="Start Game"
          style={{
            ...startButtonStyle,
            ...getDynamicImageStyle('start'),
          }}
          onClick={handleStartClick} // Updated
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
          ...getDynamicImageStyle('settings'),
        }}
        onClick={handleSettingsClick} // Updated
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
          ...getDynamicImageStyle('leaderboard'),
        }}
        onClick={handleLeaderboardClick} // Updated
        onMouseEnter={() => setHoveredButton('leaderboard')}
        onMouseLeave={() => setHoveredButton(null)}
        role="button"
        tabIndex="0"
      />
    </div>
  );
}

export default MainMenu;