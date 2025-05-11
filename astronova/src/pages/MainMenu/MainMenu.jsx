import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MainMenu/MenuButton';
import LogoutButton from '../../components/MainMenu/LogoutButton';
import AudioControls from '../../audio/AudioControls'; // Import AudioControls
import './MainMenu.css';
import StarfieldBackground from '../../components/background/StarfieldBackground';

function MainMenu() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const { userData, logout, loading } = useAuth();
  const navigate = useNavigate();
  
  // Animation control states
  const [floatSpeed, setFloatSpeed] = useState(3); // Default speed (seconds)
  const [floatHeight, setFloatHeight] = useState(15); // Default height (pixels)
  const [showControls, setShowControls] = useState(false);

  const username = userData ? userData.firstName : "User";

  // Navigation event handlers with useCallback to prevent unnecessary re-renders
  const handleProfileClick = useCallback(() => {
    console.log("Profile button clicked - navigating to /profile");
    navigate('/profile');
  }, [navigate]);

  const handleStartClick = useCallback(() => {
    console.log("Start button clicked - navigating to /game");
    navigate('/game');
  }, [navigate]);

  const handleSettingsClick = useCallback(() => {
    console.log("Settings button clicked - navigating to /settings");
    navigate('/settings');
  }, [navigate]);

  const handleLeaderboardClick = useCallback(() => {
    console.log("Leaderboard button clicked - navigating to /leaderboard");
    navigate('/leaderboard');
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      // ProtectedRoute will handle redirection
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }, [logout]);

  // Toggle animation controls visibility
  const toggleControls = () => {
    setShowControls(!showControls);
  };

  // Animation style with dynamic variables
  const characterStyle = {
    '--float-speed': `${floatSpeed}s`,
    '--float-height': `${floatHeight}px`
  };

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <div className="menu-container">
      {/* Enhanced Starfield Background */}
      <StarfieldBackground 
        particleCount={200} 
        speedFactor={0.02} 
        opacity={0.8}
        interactive={true}
        shootingStarFrequency={0.0008}
      />
      
      {/* Profile Button - Top Right */}
      <MenuButton
        src="/profile-button.png"
        alt="Profile"
        position="top-right"
        onClick={handleProfileClick}
        onHover={setHoveredButton}
        isHovered={hoveredButton === 'profile'}
      />

      {/* Logout Button */}
      <LogoutButton onClick={handleLogout} />
      
      {/* Audio Controls */}
      <AudioControls />

      {/* Main Content - Center */}
      <div className="main-content">
        <h1 className="main-title">Hey, {username}!</h1>
        
        <p className="main-subtitle">
          "You're not behind. You're just between planets." <span style={{ fontWeight: '700' }}>— Astronova</span>
        </p>

        <div className="character-container">
          <img
            src="/main-character.png"
            alt="Astronova Character"
            className="main-character floating"
            style={characterStyle}
            onClick={toggleControls}
          />
          
          {/* Animation controls - toggleable */}
          {showControls && (
            <div className="animation-controls">
              <div className="control-group">
                <label>Floating Speed</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={floatSpeed}
                  onChange={(e) => setFloatSpeed(parseFloat(e.target.value))}
                />
                <span>{floatSpeed}s</span>
              </div>
              
              <div className="control-group">
                <label>Floating Height</label>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={floatHeight}
                  onChange={(e) => setFloatHeight(parseInt(e.target.value))}
                />
                <span>{floatHeight}px</span>
              </div>
            </div>
          )}
        </div>

        <img
          src="/start-button.png"
          alt="Start Game"
          className={`start-button ${hoveredButton === 'start' ? 'hovered' : ''}`}
          onClick={handleStartClick}
          onMouseEnter={() => setHoveredButton('start')}
          onMouseLeave={() => setHoveredButton(null)}
          role="button"
          tabIndex="0"
        />
      </div>

      {/* Settings Button - Bottom Left */}
      <MenuButton
        src="/settings-button.png"
        alt="Settings"
        position="bottom-left"
        onClick={handleSettingsClick}
        onHover={setHoveredButton}
        isHovered={hoveredButton === 'settings'}
      />

      {/* Leaderboard Button - Bottom Right */}
      <MenuButton
        src="/leaderboard-button.png"
        alt="Leaderboard"
        position="bottom-right"
        onClick={handleLeaderboardClick}
        onHover={setHoveredButton}
        isHovered={hoveredButton === 'leaderboard'}
      />
    </div>
  );
}

export default MainMenu;