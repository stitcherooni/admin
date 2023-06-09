import React from 'react';
import { ImageWrapper, Wrapper } from './LoadingOverlay.styled';
import HeaderLogo from '../../assets/images/header-logo.svg';

const LoadingOverlay = () => (
  <Wrapper data-testid="loading-overlay">
    <ImageWrapper>
      <img src={HeaderLogo} alt="" />
    </ImageWrapper>
  </Wrapper>
);

export default LoadingOverlay;
