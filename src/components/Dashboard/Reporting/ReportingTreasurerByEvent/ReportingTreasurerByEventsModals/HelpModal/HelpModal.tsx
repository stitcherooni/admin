import React from 'react';
import { Wrapper, Row } from './HelpModal.styled';
import { SecondaryButton } from '../../../../../shared/Buttons/Buttons.styled';

const HelpModal = () => (
  <Wrapper>
    <Row>
      <strong className="title">Total Sales</strong>
      <p className="suptitle">Total sales for this event including fees paid.</p>
    </Row>
    <Row>
      <strong className="title">Profit</strong>
      <p className="suptitle">Total sales - Processing Fees Not Paid - Platform Fees Not Paid</p>
    </Row>
    <Row>
      <strong className="title">Processing Fees Not Paid</strong>
      <p className="suptitle">
        The fees charged by your payment processor that
        {' '}
        <strong>have not</strong>
        {' '}
        been covered by your community and therefore your organisation is liable.
      </p>
    </Row>
    <Row>
      <strong className="title">Processing Fees Paid</strong>
      <p className="suptitle">
        The fees charged by your payment processor that
        {' '}
        <strong>have been</strong>
        {' '}
        covered by your community.
      </p>
    </Row>
    <Row>
      <strong className="title">Platform Fees Not Paid</strong>
      <p className="suptitle">
        The platform fees charged by PTA Events that
        {' '}
        <strong>have not</strong>
        {' '}
        been covered by your community and therefore your organisation is liable.
      </p>
    </Row>
    <Row>
      <strong className="title">Platform Fees Paid</strong>
      <p className="suptitle">
        The platform fees charged by PTA Events that
        {' '}
        <strong>have</strong>
        {' '}
        been covered by your community.
      </p>
    </Row>
    <Row>
      <strong className="title">Red Row</strong>
      <p className="suptitle">The payment processing fees have not been paid.</p>
    </Row>
    <Row>
      <strong className="title">Blue Row</strong>
      <p className="suptitle">The customer purchased for multiple events in this order so we have tried to split the fee proportionately between all events.</p>
    </Row>
    <Row>
      <strong className="title">Split Fee Proportionately</strong>
      <p className="suptitle">If selected and the customer has purchased for multiple events in this order then we will try and split the fee proportionately between all events. Note that this gives you an idea of fees per event and may suffer from rounding issues.</p>
    </Row>
    <div className="buttons-wrapper">
      <SecondaryButton>Close</SecondaryButton>
    </div>
  </Wrapper>
);

export default HelpModal;
