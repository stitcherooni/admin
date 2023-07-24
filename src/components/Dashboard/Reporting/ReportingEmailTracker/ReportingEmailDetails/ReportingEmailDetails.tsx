import React from 'react';
import { Wrapper, Row } from './ReportingEmailDetails.styled';
import ReportingEmailStepper from './ReportingEmailStepper/ReportingEmailStepper';

const ReportingEmailDetails = () => (
  <Wrapper>
    <Row>
      <strong>To:</strong>
      <p>David Cooke (support@pta-events.co.uk)</p>
    </Row>
    <Row>
      <strong>From:</strong>
      <p>Friends of the Grove (ptaeventstest@pta-events.co.uk)</p>
    </Row>
    <Row>
      <strong>Title:</strong>
      <p>Order confirmation email sent</p>
    </Row>
    <Row>
      <strong>Message ID:</strong>
      <p>1231243</p>
    </Row>
    <br />
    <div>
      <strong>Message</strong>
      <p className="message-text">Message text</p>
    </div>
    <br />
    <ReportingEmailStepper />
  </Wrapper>
);

export default ReportingEmailDetails;
