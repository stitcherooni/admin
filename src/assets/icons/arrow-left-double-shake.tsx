import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  className?: string;
  color?: string;
}

const ArrowLeftDoubleShake = (props: IconProps) => (
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
      d="M2.66683 12.1667C2.66683 13.0871 3.41302 13.8333 4.3335 13.8333L14.0002 13.8333C14.3684 13.8333 14.6668 14.1318 14.6668 14.5C14.6668 14.8682 14.3684 15.1667 14.0002 15.1667L4.3335 15.1667C2.67664 15.1667 1.3335 13.8235 1.3335 12.1667C1.3335 10.5098 2.67664 9.16667 4.3335 9.16667L11.6668 9.16667C12.5873 9.16667 13.3335 8.42048 13.3335 7.50001C13.3335 6.57953 12.5873 5.83334 11.6668 5.83334L3.5878 5.83334L5.09151 7.36653C5.34932 7.6294 5.34522 8.05149 5.08235 8.3093C4.81949 8.56711 4.3974 8.56301 4.13959 8.30014L1.5242 5.63348C1.26993 5.37422 1.26993 4.95913 1.5242 4.69987L4.13959 2.0332C4.3974 1.77034 4.81949 1.76624 5.08235 2.02405C5.34522 2.28186 5.34932 2.70395 5.09151 2.96681L3.5878 4.50001L11.6668 4.50001C13.3237 4.50001 14.6668 5.84315 14.6668 7.50001C14.6668 9.15686 13.3237 10.5 11.6668 10.5L4.3335 10.5C3.41302 10.5 2.66683 11.2462 2.66683 12.1667Z"
      fill={props.color}
    />
  </svg>
);

ArrowLeftDoubleShake.defaultProps = {
  className: '',
  color: theme.colors.main.purple,
};

export default ArrowLeftDoubleShake;
