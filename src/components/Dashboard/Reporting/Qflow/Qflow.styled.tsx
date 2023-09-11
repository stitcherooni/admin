import styled from 'styled-components';
import Alert from '../../../shared/Alert/Alert';
import { BaseButton } from '../../../shared/Buttons/Buttons.styled';

export const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 110;
  width: calc(100% - 32px);
  max-height: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.main.black};
  font-family: ${(props) => props.theme.fonts.mainFont};
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & h3 {
    font-size: 24px;
    margin: 8px 0 16px 0;
  }

  & p {
    font-size: 16px;
    margin-bottom: 16px;
  }

  & .buttons-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin: 24px 0;
  }

  & .logo-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    & a {
      text-decoration: none;
    }

    & img {
      height: 40px;
    }
  }

  @media screen and (min-width: 1280px) {
    width: 711px;
    max-height: 700px;
    padding: 40px;

    & .buttons-wrapper {
      flex-direction: row;
    }
  }
`;

export const StyledAlert = styled(Alert)`
  margin: 16px 0;

  &.booking-alert {
    margin-right: 16px;
  }

  @media screen and (min-width: 1280px) {
    &.booking-alert {
      margin: 24px 0 0 0;
    }
  }
`;

export const Button = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    padding: 0;
    border: none;
    text-decoration: underline;
    color: ${(props) => props.theme.colors.main.purple};
  }
`;
