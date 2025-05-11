import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainMenu from './pages/MainMenu/MainMenu'; //
import LoginPage from './pages/LoginPage';   // Adjust path
import SignUpPage from './pages/SignUpPage'; // Adjust path
import ProfilePage from './pages/ProfilePage'; // Import new page
import SettingsPage from './pages/SettingsPage'; // Import new page
import LeaderboardPage from './pages/LeaderboardPage'; // Import new page
import GamePage from './pages/GamePage'; // Import new page (for Start)
import { useAuth } from './auth/AuthContext'; // Adjust path

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <SignUpPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainMenu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <LeaderboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game" // Or whatever path you want for the "Start" button
          element={
            <ProtectedRoute>
              <GamePage />
            </ProtectedRoute>
          }
        />
        {/* Optional: Add a catch-all for 404 pages */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;