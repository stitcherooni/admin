import React from 'react';
import {
  Card, CardTitle, CardWrapper, List, Wrapper,
} from './OverviewCards.styled';
import { SecondaryButton } from '../../shared/Buttons/Buttons.styled';
import { cardsList } from './cards';

const OverviewCards = () => (
  <Wrapper>
    <List>
      {cardsList.map((item) => (
        <Card key={item.id}>
          <img src={item.img} alt="" />
          <CardWrapper>
            <CardTitle>{item.count}</CardTitle>
            <p>{item.title}</p>
            <SecondaryButton size="small">{item.btnText}</SecondaryButton>
          </CardWrapper>
        </Card>
      ))}
    </List>
  </Wrapper>
);

export default OverviewCards;
