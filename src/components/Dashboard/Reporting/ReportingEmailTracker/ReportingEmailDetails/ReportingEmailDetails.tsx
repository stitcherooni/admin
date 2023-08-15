import React from 'react';
import { Wrapper, Row } from './ReportingEmailDetails.styled';
import ReportingEmailStepper from './ReportingEmailStepper/ReportingEmailStepper';
import { EmailTrackerStatItem } from '../../../../../types/reporting/emailTracker';

interface ReportingEmailDetailProps {
  data: EmailTrackerStatItem;
}

// needs sender email

const ReportingEmailDetails = (props: ReportingEmailDetailProps) => (
  <Wrapper>
    <Row>
      <strong>To:</strong>
      <p>{`${props.data.to} (${props.data.email})`}</p>
    </Row>
    <Row>
      <strong>From:</strong>
      <p>{`${props.data.sentBy} (${(props.data as any).senderEmail})`}</p>
    </Row>
    <Row>
      <strong>Title:</strong>
      <p>{props.data.messageTitle}</p>
    </Row>
    <Row>
      <strong>Message ID:</strong>
      <p>{props.data.messageId}</p>
    </Row>
    <br />
    <div>
      <strong>Message</strong>
      <p className="message-text">{props.data.message}</p>
    </div>
    <br />
    <ReportingEmailStepper data={props.data} />
  </Wrapper>
);

export default ReportingEmailDetails;
