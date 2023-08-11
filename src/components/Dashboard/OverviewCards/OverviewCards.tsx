import React from 'react';
import {
  Card, CardTitle, CardWrapper, List, Wrapper,
} from './OverviewCards.styled';
import { SecondaryButton } from '../../shared/Buttons/Buttons.styled';
import { cardsList } from './cards';

interface OverviewCardsProps {
  data: Record<string, string | number>;
}

const OverviewCards = (props: OverviewCardsProps) => (
  <Wrapper>
    <List>
      {cardsList.map((item) => (
        <Card key={item.id}>
          <img src={item.img} alt="" />
          <CardWrapper>
            <CardTitle>{props.data[item.id]}</CardTitle>
            <p>{item.title}</p>
            <SecondaryButton size="small">{item.btnText}</SecondaryButton>
          </CardWrapper>
        </Card>
      ))}
    </List>
  </Wrapper>
);

export default OverviewCards;
