import React from 'react';
import {
  TitleWrapper,
  Wrapper,
  Title,
  Text,
  AdvWrapper,
  ContentWrapper,
} from './PackagesAdv.styled';
import QuestionIconOutline from '../../../../assets/icons/question-icon-outline';

const PackagesAdv = () => (
  <div>
    <Wrapper>
      <TitleWrapper>
        <QuestionIconOutline />
        <Title>PTA Events Help & Hints</Title>
      </TitleWrapper>
      <ContentWrapper>
        <h3>General newsletter creation Help Title</h3>
        <Text>
          Please don’t worry about Dear or From as this will be done automatically.
        </Text>
      </ContentWrapper>
    </Wrapper>
  </div>
);

export default PackagesAdv;
