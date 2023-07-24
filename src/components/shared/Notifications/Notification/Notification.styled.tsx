import Button from '@mui/material/Button/Button';
import IconButton from '@mui/material/IconButton/IconButton';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  background-color: ${(props) => props.theme.colors.main.white};
  border: 2px solid ${(props) => props.theme.colors.main.blue};
  border-radius: 8px;

  & p {
    font-size: 14px;
    line-height: 18px;
    width: calc(100% - 20px);
  }

  @media screen and (min-width: 1280px) {
    width: 400px;
    border: none;
    border-radius: 0;
    border-top: 2px solid ${(props) => props.theme.colors.main.blue};
    border-left: 2px solid ${(props) => props.theme.colors.main.blue};
    border-bottom: 2px solid ${(props) => props.theme.colors.main.blue};
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h3 {
    font-size: 14px;
    line-height: 20px;
    width: calc(100% - 20px);
  }
`;

export const CloseButton = styled(IconButton)`
  &.MuiButtonBase-root.MuiIconButton-root {
    padding: 0;
    margin-left: 8px;
  }
`;

export const CallToActionButton = styled(Button)`
  &.MuiButtonBase-root.MuiButton-root {
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    text-transform: initial;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.main.green};

    & svg path {
      fill: ${(props) => props.theme.colors.main.green};
    }
  }
`;
