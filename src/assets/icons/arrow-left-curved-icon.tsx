import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  className?: string;
  color?: string;
}

const ArrowLeftCurvedIcon = (props: IconProps) => (
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
      d="M4.77217 2.66496C4.49508 2.4225 4.07391 2.45058 3.83145 2.72767L1.49812 5.39434C1.27819 5.64569 1.27819 6.02099 1.49812 6.27235L3.83145 8.93901C4.07391 9.2161 4.49508 9.24418 4.77217 9.00173C5.04927 8.75927 5.07734 8.3381 4.83489 8.06101L3.46902 6.50001L9.99984 6.50001C11.8408 6.50001 13.3332 7.99239 13.3332 9.83334C13.3332 11.6743 11.8408 13.1667 9.99984 13.1667L4.33317 13.1667C3.96498 13.1667 3.6665 13.4652 3.6665 13.8333C3.6665 14.2015 3.96498 14.5 4.33317 14.5L9.99984 14.5C12.5772 14.5 14.6665 12.4107 14.6665 9.83334C14.6665 7.25601 12.5772 5.16668 9.99984 5.16668L3.46902 5.16668L4.83489 3.60568C5.07734 3.32859 5.04927 2.90741 4.77217 2.66496Z"
      fill={props.color}
    />
  </svg>
);

ArrowLeftCurvedIcon.defaultProps = {
  className: '',
  color: theme.colors.main.purple,
};

export default ArrowLeftCurvedIcon;
