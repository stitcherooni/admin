import React from 'react';
import Banner from '../../../../assets/images/adv-square.png';
import { Card, CardWrapper, Wrapper } from './AdvCard.styled';

const AdvCard = () => (
  <Wrapper>
    <CardWrapper>
      <Card>
        <p>advertisement</p>
        <img src={Banner} alt="" />
        <a href="/">View Advertising Opportunities</a>
      </Card>
      <div className="button-wrapper" />
    </CardWrapper>
  </Wrapper>
);

export default AdvCard;
