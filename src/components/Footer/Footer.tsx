import React from 'react';
import WhiteLogo from '../../assets/images/white-logo.svg';
import { Wrapper } from './Footer.styled';

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => (
  <Wrapper className={props.className}>
    <span>© PTA Events 2023 | All rights reserved</span>
    <span>Registered: 9404586 | Incorporated in England & Wales.</span>
    <img src={WhiteLogo} alt="inverted pta events logo" />
  </Wrapper>
);

Footer.defaultProps = {
  className: '',
};

export default Footer;
