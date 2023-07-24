import React from 'react';

interface CloseIconProps {
  color?: string;
  className?: string;
}

const CloseIcon = ({ color, className }: CloseIconProps) => (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8979 6.9972L14.2967 3.82823C15.2344 2.95481 15.2344 1.53269 14.2967 0.659268C13.3577 -0.219756 11.8362 -0.219756 10.8979 0.659268L7.4997 3.82823L4.1015 0.659268C3.16376 -0.219756 1.64225 -0.219756 0.703308 0.659268C-0.234436 1.53269 -0.234436 2.95481 0.703308 3.82823L4.1015 6.9972L0.703308 10.1718C-0.234436 11.0452 -0.234436 12.4673 0.703308 13.3407C1.64225 14.2198 3.16376 14.2198 4.1015 13.3407L7.4997 10.1718L10.8979 13.3407C11.8362 14.2198 13.3577 14.2198 14.2967 13.3407C15.2344 12.4673 15.2344 11.0452 14.2967 10.1718L10.8979 6.9972Z"
      fill={color}
    />
  </svg>
);

CloseIcon.defaultProps = {
  color: '#FF0000',
  className: '',
};

export default CloseIcon;
