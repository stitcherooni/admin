import React from 'react';
import { Wrapper } from './Alert.styled';

enum AlertTypes {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

interface AlertProps {
  children: React.ReactNode;
  type: `${AlertTypes}`;
  className?: string;
}

const Alert = (props: AlertProps) => (
  <Wrapper className={`${props.type} ${props.className}`}>
    {props.children}
  </Wrapper>
);

Alert.defaultProps = {
  className: '',
};

export default Alert;
