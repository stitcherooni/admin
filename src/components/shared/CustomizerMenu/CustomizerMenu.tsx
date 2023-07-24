/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  CustomizeMenu, CustomizeMenuItem, MenuItemWrapper, StyledCheckbox,
} from './CustomizerMenu.styled';

interface CustomizerMenuProps {
  values: {
    [key: string]: {
      name: string;
      checked: boolean;
    },
  };
  handleChange: () => void;
  children: React.ReactNode;
}

const CustomizerMenu = (props: CustomizerMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div role="button" onClick={handleClick} tabIndex={0}>
        {props.children}
      </div>
      <CustomizeMenu
        disableScrollLock
        aria-labelledby="customize dashboard menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Object.values(props.values).map((item) => (
          <CustomizeMenuItem key={item.name} disableRipple>
            <MenuItemWrapper
              control={<StyledCheckbox checked={item.checked} onChange={props.handleChange} />}
              label={item.name}
            />
          </CustomizeMenuItem>
        ))}
      </CustomizeMenu>
    </>
  );
};

export default CustomizerMenu;
