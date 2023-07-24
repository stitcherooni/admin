import React from 'react';
import { theme } from '../../styles/defaultTheme';

interface IconProps {
  color?: string;
  className?: string;
}

const MessageIcon = (props: IconProps) => (
  <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.7924 12.0709C17.7924 12.1869 17.7702 12.2966 17.7382 12.4012L12.6497 6.92817L17.7924 2.92825V12.0709ZM2.68188 13.1829L7.83836 7.68814L9.79261 9.16526L11.6623 7.679L16.9033 13.1829C16.8216 13.2018 2.76359 13.2018 2.68188 13.1829ZM1.79274 12.0709V2.92825L6.9355 6.92817L1.84702 12.4012C1.81502 12.2966 1.79274 12.1869 1.79274 12.0709ZM17.221 1.78541L9.79259 7.49959L2.36416 1.78541H17.221ZM16.6496 0.642578H2.93557C1.67331 0.642578 0.649902 1.66599 0.649902 2.92825V12.0709C0.649902 13.3332 1.67331 14.3566 2.93557 14.3566H16.6496C17.9119 14.3566 18.9353 13.3332 18.9353 12.0709V2.92825C18.9353 1.66599 17.9119 0.642578 16.6496 0.642578Z"
      fill={props.color}
    />
  </svg>
);

MessageIcon.defaultProps = {
  color: theme.colors.main.purple,
  className: '',
};

export default MessageIcon;
