import React from 'react';
import FacebookLogo from '../../../../assets/images/facebook-logo.svg';
import WhatsupLogo from '../../../../assets/images/whatsup-logo.svg';
import TwitterLogo from '../../../../assets/images/twitter-logo.svg';
import QrCode from '../../../../assets/images/qrcode.png';
import {
  Caption, CardWrapper, ShareCard, Wrapper,
} from './SharePTACard.styled';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';

const SharePTACard = () => (
  <Wrapper>
    <CardWrapper>
      <Caption>Promote your PTA</Caption>
      <ShareCard>
        <div className="button-wrapper">
          <img src={FacebookLogo} alt="" />
          <img src={WhatsupLogo} alt="" />
          <img src={TwitterLogo} alt="" />
        </div>
        <img className="qr-code" src={QrCode} alt="" />
        <a href="/">Download QR Code</a>
      </ShareCard>
      <div className="pta-button-wrapper">
        <SecondaryButton>Create PTA Poster</SecondaryButton>
      </div>
    </CardWrapper>
  </Wrapper>
);

export default SharePTACard;
