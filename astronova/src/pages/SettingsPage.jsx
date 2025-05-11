// src/SettingsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const pageStyle = {
  padding: '30px',
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#1f2a37',
  minHeight: '100vh',
  fontFamily: '"Arial", sans-serif',
};

const cardStyle = {
  backgroundColor: '#374151',
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  margin: '20px auto',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
};

const settingItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #4b5563',
};

const toggleSwitchStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '50px',
  height: '24px',
};

const toggleSliderStyle = (isActive) => ({
  position: 'absolute',
  cursor: 'pointer',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: isActive ? '#3b82f6' : '#4b5563', // Blue when active
  transition: '.4s',
  borderRadius: '34px',
});

const toggleKnobStyle = (isActive) => ({
  position: 'absolute',
  content: '""',
  height: '18px',
  width: '18px',
  left: isActive ? '24px' : '3px', // Moves knob
  bottom: '3px',
  backgroundColor: 'white',
  transition: '.4s',
  borderRadius: '50%',
});

const linkStyle = {
  color: '#60a5fa',
  textDecoration: 'none',
  marginTop: '30px',
  display: 'inline-block',
};

function SettingsPage() {
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // Assuming default is dark
  const [showTooltips, setShowTooltips] = useState(false);

  const SettingToggle = ({ label, isActive, onToggle }) => (
    <div style={settingItemStyle}>
      <span>{label}</span>
      <label style={toggleSwitchStyle}>
        <input type="checkbox" checked={isActive} onChange={onToggle} style={{ opacity: 0, width: 0, height: 0 }}/>
        <span style={toggleSliderStyle(isActive)}>
          <span style={toggleKnobStyle(isActive)}></span>
        </span>
      </label>
    </div>
  );

  return (
    <div style={pageStyle}>
      <h1>Control Panel</h1>
      <div style={cardStyle}>
        <SettingToggle
          label="Enable Cosmic Notifications"
          isActive={enableNotifications}
          onToggle={() => setEnableNotifications(!enableNotifications)}
        />
        <SettingToggle
          label="Deep Space Mode (Dark)"
          isActive={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
        />
        <SettingToggle
          label="Show Starmap Tooltips"
          isActive={showTooltips}
          onToggle={() => setShowTooltips(!showTooltips)}
        />
        <p style={{marginTop: '20px', fontSize: '0.9em', color: '#9ca3af'}}>
          (Settings are for demonstration and not saved.)
        </p>
      </div>
      <Link to="/" style={linkStyle}>Back to Main Menu</Link>
    </div>
  );
}

export default SettingsPage;