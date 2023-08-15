import React from 'react';
import {
  CustomizeMenu,
  CustomizeMenuItem,
  MenuItemWrapper,
  StyledCheckbox,
} from './CustomizeTableColumnsPopup.styled';

interface CustomizeTableColumnsPopupProps {
  open: boolean;
  onClose: () => void;
  options: Map<string, { name: string; checked: boolean }>;
  updatePopup: (key: string) => void;
  anchorEl: HTMLElement;
}

const CustomizeTableColumnsPopup = (props: CustomizeTableColumnsPopupProps) => (
  <CustomizeMenu
    disableScrollLock
    aria-labelledby="customize table"
    anchorEl={props.anchorEl}
    open={props.open}
    onClose={props.onClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    {Array.from(props.options.entries()).map((item) => {
      const [key, value] = item;
      return (
        <CustomizeMenuItem key={key} disableRipple>
          <MenuItemWrapper
            control={(
              <StyledCheckbox
                checked={value.checked}
                onChange={() => props.updatePopup(key)}
                value={value.name}
              />
              )}
            label={value.name}
          />
        </CustomizeMenuItem>
      );
    })}
  </CustomizeMenu>
);

export default CustomizeTableColumnsPopup;
