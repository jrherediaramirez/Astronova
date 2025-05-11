// src/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext'; // Assuming AuthContext.jsx is in src
// If you decide to update Firestore:
// import { doc, updateDoc, getDoc } from "firebase/firestore";
// import { db } from './firebase/firebase'; // Assuming firebase.js is in src/firebase

const pageStyle = {
  padding: '30px',
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#1f2a37', // Darker space blue
  minHeight: '100vh',
  fontFamily: '"Arial", sans-serif',
};

const cardStyle = {
  backgroundColor: '#374151', // Slightly lighter card
  padding: '20px',
  borderRadius: '8px',
  maxWidth: '500px',
  margin: '20px auto',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
};

const inputStyle = {
  width: 'calc(100% - 22px)',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '4px',
  border: '1px solid #4b5563',
  backgroundColor: '#4b5563',
  color: 'white',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#3b82f6', // Blue
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};

const linkStyle = {
  color: '#60a5fa', // Lighter blue for links
  textDecoration: 'none',
  marginTop: '20px',
  display: 'inline-block',
};

function ProfilePage() {
  const { userData, currentUser } = useAuth();
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  // Mock: In a real app, you might fetch/store the bio in Firestore
  useEffect(() => {
    if (userData && userData.bio) {
      setBio(userData.bio);
    } else {
      setBio("Loves to explore the cosmos!"); // Default bio
    }
  }, [userData]);

  const handleBioUpdate = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      setMessage("You must be logged in to update your profile.");
      return;
    }
    // Mock update:
    console.log("Bio updated to:", bio);
    setMessage("Profile updated successfully! (Mock - not saved to DB)");
    // To actually save to Firestore:
    // try {
    //   const userDocRef = doc(db, "users", currentUser.uid);
    //   await updateDoc(userDocRef, { bio: bio });
    //   setMessage("Profile updated successfully!");
    // } catch (error) {
    //   console.error("Error updating profile:", error);
    //   setMessage("Failed to update profile.");
    // }
    setTimeout(() => setMessage(''), 3000);
  };

  if (!currentUser) {
    return <div style={pageStyle}><p>Loading profile or not logged in...</p></div>;
  }

  return (
    <div style={pageStyle}>
      <h1>Stargazer's Profile</h1>
      <div style={cardStyle}>
        {userData ? (
          <>
            <p><strong>First Name:</strong> {userData.firstName}</p>
            <p><strong>Last Name:</strong> {userData.lastName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Date of Birth:</strong> {userData.dob}</p>
            <hr style={{ margin: '20px 0', borderColor: '#4b5563' }} />
            <form onSubmit={handleBioUpdate}>
              <div>
                <label htmlFor="bio" style={{ display: 'block', marginBottom: '5px' }}>My Cosmic Bio:</label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                  style={{ ...inputStyle, height: 'auto' }}
                  placeholder="Tell us about your space adventures!"
                />
              </div>
              <button type="submit" style={buttonStyle}>Update Bio</button>
            </form>
            {message && <p style={{ marginTop: '10px', color: message.includes('Failed') ? '#f87171' : '#34d399' }}>{message}</p>}
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
      <Link to="/" style={linkStyle}>Back to Main Menu</Link>
    </div>
  );
}

export default ProfilePage;