import React from 'react';
import { Wrapper } from './QrCodeModal.styled';
import QrCode from '../../../../../assets/images/qrcode.png';

const QrCodeModal = () => (
  <Wrapper>
    <img src={QrCode} alt="qr code" />
  </Wrapper>
);

export default QrCodeModal;
