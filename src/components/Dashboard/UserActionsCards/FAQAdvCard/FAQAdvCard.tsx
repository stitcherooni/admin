import React from 'react';
import {
  Caption, Card, CardWrapper, StyledSecondaryButton, Wrapper,
} from './FAQAdvCard.styled';
import FAQPoster from '../../../../assets/images/user-guide-adv.png';
import { GreenButton } from '../../../shared/Buttons/Buttons.styled';

const FAQAdvCard = () => (
  <Wrapper>
    <CardWrapper>
      <Caption>Latest From PTA Events</Caption>
      <Card>
        <img src={FAQPoster} alt="" />
      </Card>
      <div className="button-wrapper">
        <StyledSecondaryButton>Find out more</StyledSecondaryButton>
        <GreenButton>Download</GreenButton>
      </div>
    </CardWrapper>
  </Wrapper>
);

export default FAQAdvCard;
