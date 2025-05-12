// src/audio/AudioControls.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from './AudioContext';
import './AudioControls.css';

const AudioControls = ({ minimal = false }) => {
  const { isPlaying, volume, togglePlay, changeVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume); // Store previous volume for unmute
  const sliderRef = useRef(null);
  
  // Get the appropriate volume icon based on state
  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) {
      return '/volume-mute.png';
    } else if (volume < 0.3) {
      return '/volume-none.png';
    } else if (volume < 0.7) {
      return '/volume-low.png';
    } else {
      return '/volume-normal.png';
    }
  };
  
  // Handle mouse enter to show volume slider
  const handleMouseEnter = () => {
    if (!minimal) {
      setShowVolumeSlider(true);
    }
  };
  
  // Handle mouse leave to hide volume slider
  const handleMouseLeave = () => {
    if (!minimal) {
      // Use a timeout to allow interaction with the slider
      // before it disappears
      setTimeout(() => {
        setShowVolumeSlider(prev => {
          if (document.querySelector('.volume-slider-container:hover')) {
            return true; // Keep open if hovering over slider
          }
          return false;
        });
      }, 300);
    }
  };
  
  // Toggle play/pause
  const handleAudioButtonClick = () => {
    togglePlay();
  };
  
  // Handle mute/unmute functionality
  const handleMuteToggle = (e) => {
    e.stopPropagation(); // Prevent triggering the parent click handler
    
    if (volume > 0) {
      // If we have volume, save it and mute
      setPreviousVolume(volume);
      changeVolume(0);
    } else {
      // If we're muted, restore the previous volume
      changeVolume(previousVolume > 0 ? previousVolume : 0.5);
    }
  };
  
  // Handle volume change from slider
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };
  
  // Handle click on the volume bar (for direct positioning)
  const handleVolumeBarClick = (e) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickPosition = rect.bottom - e.clientY;
    const barHeight = rect.height;
    
    // Calculate volume based on click position (0 at bottom, 1 at top)
    const newVolume = Math.max(0, Math.min(1, clickPosition / barHeight));
    changeVolume(newVolume);
  };

  return (
    <div 
      className="audio-controls"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="audio-toggle-button"
        onClick={handleAudioButtonClick}
        aria-label="Audio controls"
      >
        <img 
          src={getVolumeIcon()} 
          alt="Volume" 
          className="volume-icon"
          onClick={handleMuteToggle}
        />
      </button>
      
      {!minimal && showVolumeSlider && (
        <div className="volume-slider-container">
          <div 
            className="volume-bar-container" 
            onClick={handleVolumeBarClick}
            ref={sliderRef}
          >
            <div className="volume-bar-background"></div>
            <div 
              className="volume-bar-fill" 
              style={{ height: `${volume * 100}%` }}
            ></div>
            <div 
              className="volume-thumb"
              style={{ bottom: `calc(${volume * 100}% - 8px)` }}
            ></div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-range-input"
              aria-label="Volume control"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioControls;