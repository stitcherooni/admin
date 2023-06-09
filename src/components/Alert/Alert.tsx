import React from 'react';
import { CloseButton, Wrapper } from './Alert.styled';
import CloseIconRounded from '../../assets/icons/close-icon-rounded';
import ShevronDown from '../../assets/icons/shevron-down';

interface AlertProps {
  accentText?: string;
  text: string;
  icon: React.ReactNode;
  className?: string;
}

const Alert = (props: AlertProps) => (
  <Wrapper className={!props.className ? 'wrapper' : props.className}>
    {props.icon}
    <p>
      {props.accentText ? <strong>{`${props.accentText} `}</strong> : null}
      {props.text}
    </p>
    <CloseButton>
      <CloseIconRounded className="close-button" />
      <ShevronDown className="shevron" />
    </CloseButton>
  </Wrapper>
);

Alert.defaultProps = {
  accentText: null,
  className: null,
};

export default Alert;
