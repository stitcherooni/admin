/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { SyntheticEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Wrapper,
} from './Label.styled';
import QuestionIconOutline from '../../../assets/icons/question-icon-outline';
import { Overlay } from '../Modals/ModalFaqTooltip/ModalFaqTooltip.styled';
import ModalFaqTooltip from '../Modals/ModalFaqTooltip/ModalFaqTooltip';

interface LabelProps {
  text: string;
  inputId: string;
  required?: boolean;
  content?: {
    title: string;
    text: string;
  };
}

const Label = (props: LabelProps) => {
  const { inputId, text, required } = props;
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  return (
    <Wrapper className={`label-wrapper ${required ? 'required' : ''}`}>
      <label htmlFor={inputId}>{text}</label>
      {!props.content ? null : (
        <div className="icon-wrapper" onClick={toggleOpen}>
          <QuestionIconOutline />
        </div>
      )}
      {open && props.content
        ? createPortal(
          <Overlay onClick={handleClose} className="overlay">
            <ModalFaqTooltip {...props.content} toggleOpen={toggleOpen} />
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

Label.defaultProps = {
  required: false,
  content: null,
};

export default Label;
