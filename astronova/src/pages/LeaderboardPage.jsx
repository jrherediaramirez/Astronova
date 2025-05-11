// src/LeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
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
  maxWidth: '600px',
  margin: '20px auto',
  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
};

const listItemStyle = (index) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 15px',
  backgroundColor: index % 2 === 0 ? '#4b5563' : '#374151', // Alternating row colors
  borderBottom: '1px solid #2c343f',
  borderRadius: index === 0 ? '4px 4px 0 0' : index === mockData.length -1 ? '0 0 4px 4px' : '0',
});

const rankStyle = {
  minWidth: '30px',
  fontWeight: 'bold',
  color: '#9ca3af',
};

const nameStyle = {
  flexGrow: 1,
  textAlign: 'left',
  marginLeft: '15px',
};

const scoreStyle = {
  fontWeight: 'bold',
  color: '#a7f3d0', // Light green for scores
};

const linkStyle = {
  color: '#60a5fa',
  textDecoration: 'none',
  marginTop: '30px',
  display: 'inline-block',
};

// Mock data for the leaderboard
const mockData = [
  { rank: 1, name: 'Cosmo Voyager', score: 125000 },
  { rank: 2, name: 'Stella Explorer', score: 118000 },
  { rank: 3, name: 'Galaxy Pilot X', score: 115500 },
  { rank: 4, name: 'Nova Knight', score: 102300 },
  { rank: 5, name: 'Captain Quasar', score: 98700 },
  { rank: 6, name: 'Sirius Striker', score: 95000 },
  { rank: 7, name: 'Andromeda Ace', score: 89000 },
  { rank: 8, name: 'Planet Hopper', score: 82100 },
];

function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // In a real app, you would fetch this data from Firestore
    setLeaderboardData(mockData);
  }, []);

  return (
    <div style={pageStyle}>
      <h1>Galactic High Scores</h1>
      <div style={cardStyle}>
        {leaderboardData.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{...listItemStyle(-1), backgroundColor: '#1f2a37', fontWeight: 'bold' }}> {/* Header */}
              <span style={rankStyle}>Rank</span>
              <span style={nameStyle}>Pilot</span>
              <span style={scoreStyle}>Score</span>
            </li>
            {leaderboardData.map((player, index) => (
              <li key={player.rank} style={listItemStyle(index)}>
                <span style={rankStyle}>{player.rank}</span>
                <span style={nameStyle}>{player.name}</span>
                <span style={scoreStyle}>{player.score.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading leaderboard...</p>
        )}
      </div>
      <Link to="/" style={linkStyle}>Back to Main Menu</Link>
    </div>
  );
}

export default LeaderboardPage;