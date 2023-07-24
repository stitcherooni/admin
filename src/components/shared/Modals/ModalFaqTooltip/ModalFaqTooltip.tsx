/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { ModalHeader, OverlayWrapper } from './ModalFaqTooltip.styled';
import CloseIcon from '../../../../assets/icons/close-icon';

interface ModalFaqTooltipProps {
  title: string;
  text: string;
  toggleOpen: () => void;
}

const ModalFaqTooltip = (props: ModalFaqTooltipProps) => (
  <OverlayWrapper>
    <ModalHeader>
      <h2>{props.title}</h2>
      <div onClick={props.toggleOpen} className="icon">
        <CloseIcon color="#fff" className="close-button" />
      </div>
    </ModalHeader>
    <p>
      {props.text}
    </p>
  </OverlayWrapper>
);

export default ModalFaqTooltip;
