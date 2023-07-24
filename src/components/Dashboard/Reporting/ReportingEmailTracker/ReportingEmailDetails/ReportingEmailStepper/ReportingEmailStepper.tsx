import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StayCurrentPortraitOutlinedIcon from '@mui/icons-material/StayCurrentPortraitOutlined';
import { Wrapper, Row, ArrowIcon, CheckedIcon, EmailIcon, StepTitle } from './ReportingEmailStepper.styled';

const ArrowIconComponent = () => <ArrowIcon />;
const CheckedIconComponent = () => <CheckedIcon />;
const EmailIconComponent = () => <EmailIcon />;

const ReportingEmailStepper = () => (
  <Wrapper>
    <Stepper orientation="vertical">
      <Step active>
        <StepTitle StepIconComponent={ArrowIconComponent}>
          <h3>Sent</h3>
        </StepTitle>
        <StepContent>
          <Row>
            <AccessTimeOutlinedIcon />
            <p>27/10/2020 14:40:00</p>
          </Row>
        </StepContent>
      </Step>
      <Step active>
        <StepTitle StepIconComponent={CheckedIconComponent}>
          <h3>Delivered (support@pta-events.co.uk)</h3>
        </StepTitle>
        <StepContent>
          <Row>
            <AccessTimeOutlinedIcon />
            <p>27/10/2020 14:40:00</p>
          </Row>
        </StepContent>
      </Step>
      <Step active>
        <StepTitle StepIconComponent={EmailIconComponent}>
          <h3>Opened (support@pta-events.co.uk)</h3>
        </StepTitle>
        <StepContent>
          <Row>
            <AccessTimeOutlinedIcon />
            <p>27/10/2020 14:40:00</p>
          </Row>
          <Row>
            <CloudQueueOutlinedIcon />
            <p>66.22.33.89</p>
          </Row>
          <Row>
            <PlaceOutlinedIcon />
            <p>Unknown, Unknown, Unknown</p>
          </Row>
          <Row>
            <PublicOutlinedIcon />
            <p>Mozilla/5.0 (Windows NT 5.1, rv: 11.0) Gecko Firefox/11.0 (via ....)</p>
          </Row>
          <Row>
            <DesktopWindowsOutlinedIcon />
            <p>Desktop</p>
          </Row>
          <Row>
            <EmailOutlinedIcon />
            <p>browser - Firefox - Windows</p>
          </Row>
        </StepContent>
      </Step>
      <Step active>
        <StepTitle StepIconComponent={EmailIconComponent}>
          <h3>Opened (support@pta-events.co.uk)</h3>
        </StepTitle>
        <StepContent>
          <Row>
            <AccessTimeOutlinedIcon />
            <p>27/10/2020 14:40:00</p>
          </Row>
          <Row>
            <CloudQueueOutlinedIcon />
            <p>66.22.33.89</p>
          </Row>
          <Row>
            <PlaceOutlinedIcon />
            <p>Unknown, Unknown, Unknown</p>
          </Row>
          <Row>
            <PublicOutlinedIcon />
            <p>Mozilla/5.0 (Windows NT 5.1, rv: 11.0) Gecko Firefox/11.0 (via ....)</p>
          </Row>
          <Row>
            <StayCurrentPortraitOutlinedIcon />
            <p>Mobile</p>
          </Row>
          <Row>
            <EmailOutlinedIcon />
            <p>browser - Firefox - Windows</p>
          </Row>
        </StepContent>
      </Step>
    </Stepper>
  </Wrapper>
);

export default ReportingEmailStepper;
