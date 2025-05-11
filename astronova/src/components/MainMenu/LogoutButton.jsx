import { memo } from 'react';
import '../../pages/MainMenu/MainMenu.css';

const LogoutButton = memo(({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="logout-button"
    >
      Logout
    </button>
  );
});

export default LogoutButton;