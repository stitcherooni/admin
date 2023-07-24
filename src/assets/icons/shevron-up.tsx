import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  className?: string;
  color?: string;
}

const ShevronUp = (props: IconProps) => (
  <svg
    width="14"
    height="9"
    viewBox="0 0 14 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8289 8.33304C13.5996 8.55565 13.2285 8.55565 13.0003 8.33304L6.99964 1.88862L1.00011 8.33304C0.771384 8.55565 0.400279 8.55565 0.171548 8.33304C-0.0571827 8.10472 -0.0571827 7.7394 0.171548 7.51678L6.55676 0.661378C6.67871 0.541509 6.84034 0.490136 6.99964 0.501552C7.15951 0.490136 7.32114 0.541509 7.44368 0.661378L13.8289 7.51678C14.057 7.7394 14.057 8.10472 13.8289 8.33304"
      fill={props.color}
    />
  </svg>
);

ShevronUp.defaultProps = {
  className: null,
  color: theme.colors.main.white,
};

export default ShevronUp;
