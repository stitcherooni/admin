import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 110;
  max-width: calc(100% - 32px);
  max-height: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.main.black};
  font-family: ${(props) => props.theme.fonts.mainFont};
  border-radius: 8px;
  padding: 20px;

  & img {
    max-width: 320px;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  @media screen and (min-width: 1280px) {
    width: 370px;
    max-height: 370px;
    padding: 40px;
  }
`;
