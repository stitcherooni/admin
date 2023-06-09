import Button from '@mui/material/Button';
import styled from 'styled-components';

const BaseButton = styled(Button)`
  &.MuiButtonBase-root.MuiButton-root {
    font-family: ${(props) => props.theme.fonts.mainFont};
  }
`;

export const BackButton = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    text-decoration: underline;
    font-size: 16px;
    line-height: 24px;
    text-transform: initial;
    color: ${(props) => props.theme.colors.main.black};
    padding: 0;

    @media screen and (min-width: 1280px) {
      font-size: 18px;
      line-height: 27px;
    }
  }
`;

export const GreenButton = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    font-size: 16px;
    line-height: 24px;
    text-transform: initial;
    color: ${(props) => props.theme.colors.main.white};
    background-color: ${(props) => props.theme.colors.main.green};
    padding: 8px 48px;
    border-radius: 8px;

    &:hover {
      box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.24);
    }

    &:disabled {
      opacity: 0.32;
    }
    
    & .MuiButton-endIcon {
      display: none;
    }

    @media screen and (min-width: 1280px) {
      font-size: 18px;
      line-height: 27px;

      & .MuiButton-endIcon {
        display: block;
      }
    }
  }
`;

export const SecondaryButton = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    font-size: 16px;
    line-height: 24px;
    text-transform: initial;
    color: ${(props) => props.theme.colors.main.green};
    background-color: ${(props) => props.theme.colors.main.white};
    padding: 8px 32px;
    border: 2px solid ${(props) => props.theme.colors.main.green};
    border-radius: 8px;
    transition: all 0.3s;
    height: 40px;
    position: relative;

    &:disabled {
      opacity: 0.32;
    }

    @media screen and (min-width: 1280px) {
      font-size: 18px;
      line-height: 27px;
    }
  }
`;
