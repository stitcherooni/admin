import IconButton from '@mui/material/IconButton/IconButton';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 12px;
  line-height: 18px;
  width: 100%;
  padding: 5px 14.75px 5px 18.75px;

  & p {
    margin-left: 16px;
    width: calc(100% - 61px);
  }

  & svg {
    min-width: 20px;
  }

  @media screen and (min-width: 1280px) {
    height: 40px;
    padding: 10px 62.8px;

    & p {
      width: calc(100% - 61px);
    }
  }
`;

export const CloseButton = styled(IconButton)`
  &.MuiButtonBase-root.MuiIconButton-root {
    padding: 0;
  }

  & .close-button {
    display: none;
  }

  @media screen and (min-width: 1280px) {
    & .shevron {
      display: none;
    }

    & .close-button {
      display: block;
    }

    &.MuiButtonBase-root.MuiIconButton-root {
      padding: 8px;
    }
  }
`;
