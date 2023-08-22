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
  testid?: string;
}

const Alert = (props: AlertProps) => (
  <Wrapper className={`${props.type} ${props.className}`} data-testid={props.testid ?? ''}>
    {props.children}
  </Wrapper>
);

Alert.defaultProps = {
  className: '',
  testid: '',
};

export default Alert;
