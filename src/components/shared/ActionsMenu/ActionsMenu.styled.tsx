import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import styled from 'styled-components';
import { BaseButton } from '../Buttons/Buttons.styled';

export const CustomizeMenu = styled(Menu)`
  & .MuiPopover-paper {
    min-width: 258px;
    max-width: 310px;
    background-color: ${(props) => props.theme.colors.main.white};
    border-radius: 8px;
    margin-top: 30px;
  }

  & .MuiMenu-list {
    padding: 8px 8px 4px 8px;
    display: flex;
    flex-direction: column;
  }
`;

export const CustomizeMenuItem = styled(MenuItem)`
  &.MuiButtonBase-root.MuiMenuItem-root {
    margin: 0 0 4px 0;
    padding: 4px 8px;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
    display: flex;
    align-items: center;
    gap: 8px;

    & .prize,
    & .ticket {
      width: 20px;
    }

    & .customize-view,
    & .random {
      width: 18px;
    }

    & .copy,
    & .email {
      width: 16px;
    }

    &:hover {
      font-weight: 700;
      border-bottom: 1px solid ${(props) => props.theme.colors.main.black};
      transition: all 0.3s;
    }
  }
`;

export const Button = styled(BaseButton)<{ open: boolean }>`
  &.MuiButtonBase-root.MuiButton-root {
    padding: 3px 15px;
    background-color: ${(props) => (props.open ? props.theme.colors.main.green : props.theme.colors.main.white)};
    color: ${(props) => (!props.open ? props.theme.colors.main.green : props.theme.colors.main.white)};
    border: 1px solid ${(props) => (!props.open ? props.theme.colors.main.green : props.theme.colors.main.white)};
    border-radius: 8px;
  }
`;
