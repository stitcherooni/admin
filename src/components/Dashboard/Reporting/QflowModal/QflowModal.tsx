import React from 'react';
import { Wrapper } from './QflowModal.styled';
import QflowLogo from '../../../../assets/images/qflow-logo.svg';
import IosLogo from '../../../../assets/images/ios-logo.png';
import AndroidLogo from '../../../../assets/images/android-logo.png';
import { GreenButton, SecondaryButton } from '../../../shared/Buttons/Buttons.styled';

interface QflowModalProps {
  handleClose: () => void;
}

const QflowModal = (props: QflowModalProps) => (
  <Wrapper>
    <img src={QflowLogo} alt="" className="logo" />
    <h3>Sync to Qflow</h3>
    <p>
      We’ve integrated with
      {' '}
      <a href="#">Qflow</a>
      {' '}
      which is a simple an intuitive ticket scanning and
      guest list app that you can sue to scan your guests in to your events. As
      {' '}
      <strong>Friends of the Grove</strong>
      {' '}
      is on our premium plan we have included this facility
      free of charge.
    </p>
    <p>
      All you need to do is access your ‘Tickets’ report to get started.
    </p>
    <div className="buttons-wrapper">
      <GreenButton>Head to Tickets</GreenButton>
      <SecondaryButton onClick={props.handleClose}>Close</SecondaryButton>
    </div>
    <div className="logo-wrapper">
      <a href="">
        <img src={IosLogo} alt="" />
      </a>
      <a href="">
        <img src={AndroidLogo} alt="" />
      </a>
    </div>
  </Wrapper>
);

export default QflowModal;
