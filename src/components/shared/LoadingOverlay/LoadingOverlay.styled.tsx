import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.main.white};
  opacity: 0.8;
  z-index: 100;
`;

const loadingAnimate = keyframes`
  0% { transform: translateX(-50px); }
  50% { transform: translateX(50px); }
  100% { transform: translateX(-50px); }
`;

export const ImageWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;

  & img {
    animation-name: ${loadingAnimate};
    animation-iteration-count: infinite;
    animation-duration: 4s;
  }
`;
