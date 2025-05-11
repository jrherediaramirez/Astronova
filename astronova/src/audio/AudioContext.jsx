// src/audio/AudioContext.jsx
import { createContext, useContext, useEffect, useState, useRef } from 'react';

const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}

export function AudioProvider({ children }) {
  // Create a ref to hold the audio element
  // Using useRef ensures the same instance persists across renders
  const audioRef = useRef(null);
  
  // State to track if music is playing
  const [isPlaying, setIsPlaying] = useState(false);
  
  // State for volume level (0-1)
  const [volume, setVolume] = useState(0.5);
  
  // Create the audio element only once on component mount
  useEffect(() => {
    // Check localStorage for saved preferences
    const savedMusicEnabled = localStorage.getItem('musicEnabled');
    const savedVolume = localStorage.getItem('musicVolume');
    
    // Create the audio element
    const audio = new Audio('./music/background-music.mp3'); // Update path to your music file
    
    // Configure audio
    audio.loop = true;
    
    // Set volume from saved preference or default
    if (savedVolume !== null) {
      audio.volume = parseFloat(savedVolume);
      setVolume(parseFloat(savedVolume));
    } else {
      audio.volume = volume;
    }
    
    // Set playing state from saved preference
    const shouldPlay = savedMusicEnabled === null ? true : savedMusicEnabled === 'true';
    setIsPlaying(shouldPlay);
    
    // Store the audio element in the ref
    audioRef.current = audio;
    
    // Clean up when component unmounts
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);
  
  // Effect to handle play/pause based on isPlaying state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Use promise to handle autoplay restrictions more gracefully
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log('Autoplay prevented. User interaction required.', error);
          // We don't change isPlaying state here to allow for retry
        });
      }
    } else {
      audioRef.current.pause();
    }
    
    // Save preference to localStorage
    localStorage.setItem('musicEnabled', isPlaying.toString());
  }, [isPlaying]);
  
  // Effect to handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = volume;
    localStorage.setItem('musicVolume', volume.toString());
  }, [volume]);
  
  // Functions to control audio
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };
  
  const changeVolume = (newVolume) => {
    setVolume(newVolume);
  };
  
  // Create value object for context
  const value = {
    isPlaying,
    volume,
    togglePlay,
    changeVolume
  };
  
  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}