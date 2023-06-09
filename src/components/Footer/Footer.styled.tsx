import styled from 'styled-components';

export const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.main.purple};
  height: 58px;

  & span {
    font-family: ${(props) => props.theme.fonts.mainFont};
    color: ${(props) => props.theme.colors.main.white};
    font-size: 12px;
    line-height: 18px;
  }

  & img {
    display: none;
  }

  &.final {
    display: none;
  }

  @media screen and (min-width: 1280px) {
    padding: 15px 72px;
    height: 48px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &.final {
      display: flex;
    }

    & img {
      display: block;
      margin-top: 2px;
    }
  }
`;
