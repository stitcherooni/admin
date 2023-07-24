import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  className?: string;
  color?: string;
}

const ShevronDown = (props: IconProps) => (
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
      d="M13.8289 0.666961C13.5996 0.444346 13.2285 0.444346 13.0003 0.666961L6.99964 7.11138L1.00011 0.666961C0.771384 0.444346 0.400279 0.444346 0.171548 0.666961C-0.0571827 0.895285 -0.0571827 1.2606 0.171548 1.48322L6.55676 8.33862C6.67871 8.45849 6.84034 8.50986 6.99964 8.49845C7.15951 8.50986 7.32114 8.45849 7.44368 8.33862L13.8289 1.48322C14.057 1.2606 14.057 0.895285 13.8289 0.666961"
      fill={props.color}
    />
  </svg>
);

ShevronDown.defaultProps = {
  className: null,
  color: theme.colors.main.white,
};

export default ShevronDown;
