import { useState, useCallback } from 'react';
import { useAuth } from '../../auth/AuthContext' // Adjust path as needed
import { useNavigate } from 'react-router-dom';
import MenuButton from '../../components/MainMenu/MenuButton'
import LogoutButton from '../../components/MainMenu/LogoutButton';
import './MainMenu.css';
import StarfieldBackground from '../../components/background/StarfieldBackground';

function MainMenu() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const { userData, logout, loading } = useAuth();
  const navigate = useNavigate();

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

  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }

  return (
    <div className="menu-container">
      {/* Profile Button - Top Right */}
      <StarfieldBackground 
        particleCount={150} 
        speedFactor={0.03} 
        opacity={0.7}
        interactive={true}
      />
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

      {/* Main Content - Center */}
      <div className="main-content">
        <h1 className="main-title">Hey, {username}!</h1>
        
        <p className="main-subtitle">
          "You're not behind. You're just between planets." <span style={{ fontWeight: '700' }}>— Astronova</span>
        </p>

        <img
          src="/main-character.png"
          alt="Astronova Character"
          className="main-character"
        />

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