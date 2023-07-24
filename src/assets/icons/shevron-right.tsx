import React from 'react';

interface IconProps {
  className?: string;
  color?: string;
}

const ShevronRight = (props: IconProps) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.29289 4.20711C4.90237 3.81658 4.90237 3.18342 5.29289 2.79289C5.68342 2.40237 6.31658 2.40237 6.70711 2.79289L11.7071 7.79289C12.0976 8.18342 12.0976 8.81658 11.7071 9.20711L6.70711 14.2071C6.31658 14.5976 5.68342 14.5976 5.29289 14.2071C4.90237 13.8166 4.90237 13.1834 5.29289 12.7929L9.58579 8.5L5.29289 4.20711Z"
      fill={props.color}
    />
  </svg>
);

ShevronRight.defaultProps = {
  className: '',
  color: '#A1A1A1',
};

export default ShevronRight;
