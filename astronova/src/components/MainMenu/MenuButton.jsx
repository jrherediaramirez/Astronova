import { memo } from 'react';
import '../../pages/MainMenu/MainMenu.css';

const MenuButton = memo(({ 
  src, 
  alt, 
  position, 
  onClick, 
  onHover,
  isHovered
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`menu-button menu-button-${position} ${isHovered ? 'hovered' : ''} ${isHovered === false ? 'not-hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={() => onHover(alt.toLowerCase())}
      onMouseLeave={() => onHover(null)}
      role="button"
      tabIndex="0"
    />
  );
});

export default MenuButton;