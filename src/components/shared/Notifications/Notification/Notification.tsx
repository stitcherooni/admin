import React from 'react';
import Logo from '../../../assets/images/notification-Image.png';
import CloseIconRounded from '../../../assets/icons/close-icon-rounded';
import ButtonArrow from '../../../assets/icons/button-arrow';
import {
  Wrapper, MessageHeader, CloseButton, CallToActionButton,
} from './Notification.styled';

interface NotificationProps {
  className?: string;
}

const Notification = (props: NotificationProps) => (
  <Wrapper className={props.className}>
    <img src={Logo} alt="" />
    <div>
      <MessageHeader>
        <h3>Looking to run a school diso?</h3>
        <CloseButton>
          <CloseIconRounded />
        </CloseButton>
      </MessageHeader>
      <p>This template has been used by 32 PTAs this month</p>
      <a href="/">
        <CallToActionButton endIcon={<ButtonArrow />}>Create Yours Now</CallToActionButton>
      </a>
    </div>
  </Wrapper>
);

Notification.defaultProps = {
  className: '',
};

export default Notification;
