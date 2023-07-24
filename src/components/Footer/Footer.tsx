import React from 'react';
import WhiteLogo from '../../assets/images/white-logo.svg';
import {
  Wrapper, CopyrightArea, FooterContent, Contacts, CTA,
} from './Footer.styled';
import OrganizationLogo from '../../assets/images/organization-logo.svg';
import PtaLogo from '../../assets/images/header-logo.svg';
import StripeLogo from '../../assets/images/stripe-logo.png';
import EnvelopIcon from '../../assets/icons/envelop-icon';
import GlobeIcon from '../../assets/icons/globe-icon';
import FacebookIcon from '../../assets/icons/facebook-icon';
import MapMarkerIcon from '../../assets/icons/map-marker-icon';
import { SecondaryButton } from '../shared/Buttons/Buttons.styled';

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => (
  <Wrapper className={props.className}>
    <FooterContent>
      <Contacts>
        <img src={OrganizationLogo} alt="" />
        <h3>Friends of Parish School</h3>
        <ul>
          <li>
            <EnvelopIcon />
            <a className="email" href="mailto:friendsofparishschool@yahoo.com">friendsofparishschool@yahoo.com</a>
          </li>
          <li>
            <GlobeIcon />
            <a href="http://www.parishceschool.com/888/fops" target="_blank" rel="noreferrer">http://www.parishceschool.com/888/fops</a>
          </li>
          <li>
            <FacebookIcon />
            <a href="https://www.facebook.com/friendsofparishschool" target="_blank" rel="noreferrer">https://www.facebook.com/friendsofparishschool</a>
          </li>
          <li>
            <MapMarkerIcon />
            <span>FOPS, London Lane, Bromley, Kent, BR1 4HF</span>
          </li>
        </ul>
        <p>
          Registered with the Charity Commission as
          {' '}
          <a href="/">1115516</a>
        </p>
      </Contacts>
      <CTA>
        <img className="pta-logo" src={PtaLogo} alt="" />
        <a href="https://stripe.com" target="_blank" rel="noreferrer">
          <img className="stripe-logo" src={StripeLogo} alt="" />
        </a>
        <SecondaryButton>Create Your Own PTA Events Site</SecondaryButton>
        <p className="suptitle">Takes 5 Minutes - No Payment Required</p>
        <ul>
          <li>
            <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=privacy-Jun-2022" target="_blank" rel="noreferrer">Privacy</a>
          </li>
          <li>
            <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=terms" target="_blank" rel="noreferrer">Terms</a>
          </li>
          <li>
            <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=cookie-policy" target="_blank" rel="noreferrer">Cookie Policy</a>
          </li>
          <li>
            <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=dashboard#deliveryModal" target="_blank" rel="noreferrer">Delivery</a>
          </li>
          <li>
            <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=local-advertising" target="_blank" rel="noreferrer">Advertising</a>
          </li>
        </ul>
      </CTA>
    </FooterContent>
    <CopyrightArea>
      <span>{`© PTA Events ${new Date().getFullYear()} | All rights reserved`}</span>
      <span>Registered: 9404586 | Incorporated in England & Wales.</span>
      <img src={WhiteLogo} alt="inverted pta events logo" />
    </CopyrightArea>
  </Wrapper>
);

Footer.defaultProps = {
  className: '',
};

export default Footer;
