import Checkbox from '@mui/material/Checkbox/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Menu from '@mui/material/Menu/Menu';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import styled from 'styled-components';

export const CustomizeMenu = styled(Menu)`
  & .MuiPopover-paper {
    width: 258px;
    background-color: ${(props) => props.theme.colors.main.white};
    border-radius: 8px;
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
    padding: 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
  }
`;

export const MenuItemWrapper = styled(FormControlLabel)`
  &.MuiFormControlLabel-root {
    width: 100%;
    margin: 0;
    font-family: ${(props) => props.theme.fonts.mainFont};
    color: ${(props) => props.theme.colors.main.black};
    font-size: 14px;
    line-height: 21px;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  &.MuiButtonBase-root.MuiCheckbox-root {
    padding: 4px 8px;
    color: ${(props) => props.theme.colors.main.green};

    &.Mui-checked {
      color: ${(props) => props.theme.colors.main.green};
    }
  }
`;
