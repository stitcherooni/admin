import React from 'react';
import { GreenButton } from '../../shared/Buttons/Buttons.styled';
import Alert from '../../shared/Alert/Alert';
import { Wrapper, Card } from './LegalInformation.styled';

const LegalInformation = () => (
  <Wrapper>
    <Card>
      <Alert type="success">
        <h3>Subscription Terms</h3>
        <p>
          Your
          {' '}
          <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=subscription-terms" target="_blank" rel="noreferrer">
            subscription terms and conditions
          </a>
          {' '}
          were signed by
          {' '}
          <strong>James Harris</strong>
          {' '}
          on
          {' '}
          <strong>22/10/2020</strong>
          {' '}
          at
          {' '}
          <strong>19:16</strong>
          .
        </p>
        <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=subscription-terms" target="_blank" rel="noreferrer">
          <GreenButton>View</GreenButton>
        </a>
      </Alert>
    </Card>
    <Card>
      <Alert type="success">
        <h3>Lawful Basics</h3>
        <p>
          Your
          {' '}
          <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=pta&activeTab=GDPRControllerQuestionnaire" target="_blank" rel="noreferrer">
            valid lawful basis
          </a>
          {' '}
          were last signed by
          {' '}
          <strong>James Harris</strong>
          {' '}
          on
          {' '}
          <strong>22/10/2020</strong>
          {' '}
          at
          {' '}
          <strong>19:16</strong>
          .
        </p>
        <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=pta&activeTab=GDPRControllerQuestionnaire" target="_blank" rel="noreferrer">
          <GreenButton>View</GreenButton>
        </a>
      </Alert>
    </Card>
    <Card>
      <Alert type="success">
        <h3>DPA</h3>
        <p>
          Your
          {' '}
          <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=data-processing-agreement" target="_blank" rel="noreferrer">
            Data Processing Agreement
          </a>
          {' '}
          was signed by
          {' '}
          <strong>James Harris</strong>
          {' '}
          on
          {' '}
          <strong>22/10/2020</strong>
          {' '}
          at
          {' '}
          <strong>19:16</strong>
          .
        </p>
        <a href="https://www.pta-events.com/ptaeventstest/index.cfm?event=data-processing-agreement" target="_blank" rel="noreferrer">
          <GreenButton>View</GreenButton>
        </a>
      </Alert>
    </Card>
  </Wrapper>
);

export default LegalInformation;
