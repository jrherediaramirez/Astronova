// src/components/AudioControls/AudioControls.jsx
import React, { useState } from 'react';
import { useAudio } from './AudioContext';
import './AudioControls.css';

const AudioControls = ({ minimal = false }) => {
  const { isPlaying, volume, togglePlay, changeVolume } = useAudio();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  // Toggle visibility of volume slider
  const handleAudioButtonClick = () => {
    if (minimal) {
      // In minimal mode, just toggle play/pause
      togglePlay();
    } else {
      // In full mode, show/hide volume slider
      setShowVolumeSlider(prev => !prev);
    }
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    changeVolume(parseFloat(e.target.value));
  };

  return (
    <div className="audio-controls">
      <button 
        className={`audio-toggle-button ${isPlaying ? 'playing' : 'paused'}`}
        onClick={handleAudioButtonClick}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      
      {!minimal && showVolumeSlider && (
        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            aria-label="Volume control"
          />
          <button 
            className="volume-close-button"
            onClick={() => setShowVolumeSlider(false)}
            aria-label="Close volume control"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default AudioControls;