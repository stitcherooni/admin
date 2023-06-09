import React from 'react';

interface IconProps {
  className?: string;
}

const ShevronDown = (props: IconProps) => (
  <svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className ? props.className : ''}>
    <path d="M5.25 11.25L12.25 20L19.25 11.25" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

ShevronDown.defaultProps = {
  className: null,
};

export default ShevronDown;
