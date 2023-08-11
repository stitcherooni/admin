import React from 'react';
import { Wrapper, Item } from './StatisticBar.styled';
import CheckIconRounded from '../../../../assets/icons/check-icon-rounded';

interface StatisticItem {
  label: string;
  value: number | string;
}

interface StatisticBarProps {
  data: StatisticItem[];
}

const StatisticBar = (props: StatisticBarProps) => (
  <Wrapper className="statistic">
    {props.data.map((item, i) => (
      <Item key={i} columns={props.data.length}>
        <CheckIconRounded />
        <p>
          {item.label}
          <strong>{` ${item.value}`}</strong>
        </p>
      </Item>
    ))}
  </Wrapper>
);

export default StatisticBar;
