import React from 'react';
import {
  CardWrapper, Caption, Card, Content, Row, StyledSecondaryButton, Wrapper,
} from './UpcomingEventCard.styled';
import { GreenButton } from '../../../shared/Buttons/Buttons.styled';
import EventPoster from '../../../../assets/images/event-poster.png';
import { getCurrencyByCode } from '../../../../utils/currency';

const UpcomingEventCard = () => (
  <Wrapper>
    <CardWrapper>
      <Caption>Upcoming Event</Caption>
      <Card>
        <img src={EventPoster} alt="" />
        <Content>
          <Row>
            <strong>Event Name</strong>
            <p>Fireworks Night</p>
          </Row>
          <Row>
            <strong>Event Description</strong>
            <p>Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet</p>
          </Row>
          <Row>
            <strong>Start Date / Time</strong>
            <p>21 / 03 / 2023 - 18:00</p>
          </Row>
          <Row>
            <strong>End Date / Time</strong>
            <p>21 / 03 / 2023 - 20:00</p>
          </Row>
          <Row>
            <strong>Ticket Price</strong>
            <p>{getCurrencyByCode('GBP', 5)}</p>
          </Row>
          <Row>
            <strong>Tickets Sold</strong>
            <p>92 / 100</p>
          </Row>
          <Row>
            <strong>Volunteers</strong>
            <p>3 / 5</p>
          </Row>
        </Content>
      </Card>
      <div className="button-wrapper">
        <StyledSecondaryButton>Create Event Poster</StyledSecondaryButton>
        <GreenButton>Open</GreenButton>
      </div>
    </CardWrapper>
  </Wrapper>
);

export default UpcomingEventCard;
