// src/pages/GamePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BirdAnimation from '../../components/BirdAnimation/BirdAnimation';
import './GamePage.css'; // Import external CSS

function GamePage() {
  const navigate = useNavigate();
  const [studyTopic, setStudyTopic] = useState('');
  const [studyTime, setStudyTime] = useState(30); // Default 30 minutes
  const [restTime, setRestTime] = useState(5);   // Default 5 minutes
  
  // State to control time selection visibility
  const [timeSelectionVisible, setTimeSelectionVisible] = useState(false);
  
  // State to track if we're adjusting study time or rest time
  const [adjustingStudyTime, setAdjustingStudyTime] = useState(true);
  
  const handleClose = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    setStudyTopic(e.target.value);
  };

  // Opens the time selection and sets which timer we're adjusting
  const handleTimerClick = (isStudyTimer) => {
    setAdjustingStudyTime(isStudyTimer);
    setTimeSelectionVisible(true);
  };

  // Handle time selection
  const selectTime = (time) => {
    if (adjustingStudyTime) {
      setStudyTime(time);
    } else {
      setRestTime(time);
    }
    
    // Hide the time selection after making a choice
    setTimeSelectionVisible(false);
  };

  // Determine which time options to show based on which timer is being adjusted
  const timeOptions = adjustingStudyTime 
    ? [20, 25, 30, 45, 50] 
    : [0, 3, 5, 10, 15];

  return (
    <div className="game-page">
      {/* Rocket background */}
      <img 
        src="/rocketbackground.png" 
        alt="Rocket" 
        className="rocket-background"
      />
      
      {/* Birds animation */}
      <BirdAnimation 
          count={2}           // Number of birds (increase/decrease as desired)
          minSize={15}        // Minimum bird size in pixels
         maxSize={25}        // Maximum bird size in pixels
/>

      {/* Close button */}
      <button className="close-button" onClick={handleClose}>
        <img src="/x-circle-icon.png" alt="Close" />
      </button>

      {/* Bottom panel */}
      <div className="bottom-panel">
        {/* Study topic input */}
        <div className="study-prompt">
          <p>What are we studying today?</p>
          <div className="input-container">
            <input
              type="text"
              value={studyTopic}
              onChange={handleInputChange}
              placeholder="Enter Here..."
              className="study-input"
            />
          </div>
        </div>

        {/* Time selection buttons - collapsible */}
        <div className={`time-options-container ${timeSelectionVisible ? 'visible' : ''}`}>
          <div className="time-options">
            {timeOptions.map(time => (
              <button 
                key={time}
                className={`time-option ${
                  (adjustingStudyTime && studyTime === time) || 
                  (!adjustingStudyTime && restTime === time) ? 'selected' : ''
                }`}
                onClick={() => selectTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Timer section */}
        <div className="timer-section">
          <div 
            className={`timer-block ${adjustingStudyTime && timeSelectionVisible ? 'active' : ''}`}
            onClick={() => handleTimerClick(true)}
          >
            <img src="/timer.png" alt="Timer" className="timer-icon" />
            <div className="timer-label">Study Time</div>
            <div className="timer-value">{studyTime} Minutes</div>
          </div>
          
          <div 
            className={`timer-block ${!adjustingStudyTime && timeSelectionVisible ? 'active' : ''}`}
            onClick={() => handleTimerClick(false)}
          >
            <img src="/sliders.png" alt="Rest" className="timer-icon" />
            <div className="timer-label">Rest Timer</div>
            <div className="timer-value">{restTime} Minutes</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePage;