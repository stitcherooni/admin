import React, { SyntheticEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { handleCloseModal } from '../../../../utils/modals';
import { StyledAlert, Button } from './Qflow.styled';
import { Overlay } from '../Reporting.styled';
import QflowModal from './QflowModal';

const Qflow = () => {
  const [openQflowModal, setQflowModalOpen] = useState(false);
  const toggleOpenQflowModal = () => setQflowModalOpen(!openQflowModal);

  const handleCloseQflowModal = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenQflowModal);
  };

  return (
    <>
      <StyledAlert type="success" className="booking-alert">
        <p>
          Good news
          {' '}
          <strong>Test User</strong>
          , we’ve integrated with
          {' '}
          <a href="https://www.getqflow.com/features" target="_blank" rel="noreferrer">
            Qflow
          </a>
          {' '}
          which is a simple and intuitive ticket scanning and guest list app that you can use to
          scan your guests in to your events.
          <br />
          <Button type="button" onClick={toggleOpenQflowModal}>
            See more information
          </Button>
        </p>
      </StyledAlert>
      {openQflowModal
        ? createPortal(
          <Overlay onClick={handleCloseQflowModal} className="overlay">
            <QflowModal handleClose={toggleOpenQflowModal} />
          </Overlay>,
          document.body,
        )
        : null}
    </>
  );
};

export default Qflow;
