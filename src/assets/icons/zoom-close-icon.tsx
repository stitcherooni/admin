import React from 'react';

interface IconProps {
  className?: string;
}

const ZoomCloseIcon = (props: IconProps) => (
  <svg width="43" height="42" viewBox="0 0 43 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={!props.className ? '' : props.className}>
    <path d="M32.0543 29.0798L39.5495 36.5733L37.0733 39.0495L29.5798 31.5543C26.7915 33.7894 23.3235 35.0051 19.75 35C11.056 35 4 27.944 4 19.25C4 10.556 11.056 3.5 19.75 3.5C28.444 3.5 35.5 10.556 35.5 19.25C35.5051 22.8235 34.2894 26.2915 32.0543 29.0798ZM28.5437 27.7812C30.7647 25.4973 32.005 22.4358 32 19.25C32 12.481 26.5173 7 19.75 7C12.981 7 7.5 12.481 7.5 19.25C7.5 26.0173 12.981 31.5 19.75 31.5C22.9358 31.505 25.9973 30.2647 28.2812 28.0437L28.5437 27.7812V27.7812Z" fill="#0FB3A2" />
  </svg>
);

ZoomCloseIcon.defaultProps = {
  className: null,
};

export default ZoomCloseIcon;
