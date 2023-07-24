import React from 'react';
import { OverlayWrapper } from './DeleteConfirmationModal.styled';
import { GreenButton, SecondaryButton } from '../../Buttons/Buttons.styled';

interface DeleteConfirmationModalProps {
  confirm: () => void;
  cancel: () => void;
  children: React.ReactNode;
  cancelButtonName: string;
  confirmButtonName: string;
}

const DeleteConfirmationModal = (props: DeleteConfirmationModalProps) => (
  <OverlayWrapper>
    {props.children}
    <div className="buttons-wrapper">
      <GreenButton onClick={props.confirm}>{props.confirmButtonName}</GreenButton>
      <SecondaryButton onClick={props.cancel}>{props.cancelButtonName}</SecondaryButton>
    </div>
  </OverlayWrapper>
);

export default DeleteConfirmationModal;
