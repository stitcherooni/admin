/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactNode } from 'react';
import {
  CustomizeMenu, CustomizeMenuItem, Button,
} from './ActionsMenu.styled';
import ShevronUp from '../../../assets/icons/shevron-up';
import ShevronDown from '../../../assets/icons/shevron-down';
import { theme } from '../../../styles/defaultTheme';

export interface ActionsMenuOption {
  value: number | string;
  label: number | string;
  icon?: JSX.Element;
  handleClick?: () => void;
}

interface ActionsMenuProps {
  options: ActionsMenuOption[];
  menuName?: string;
  children?: ReactNode;
}

const ActionsMenu = (props: ActionsMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChoose = (cb?: () => void) => {
    if (cb) cb();
    setAnchorEl(null);
  };

  return (
    <>
      {!props.children ? (
        <Button
          endIcon={open ? <ShevronUp color={theme.colors.main.white} />
            : <ShevronDown color={theme.colors.main.green} />}
          onClick={handleClick}
          open={open}
        >
          {props.menuName}
        </Button>
      ) : <div onClick={handleClick}>{props.children}</div>}
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
        {props.options.map((item) => (
          <CustomizeMenuItem key={item.value} disableRipple onClick={() => handleChoose(item.handleClick)}>
            {item.icon ? item.icon : null}
            <p>{item.label}</p>
          </CustomizeMenuItem>
        ))}
      </CustomizeMenu>
    </>
  );
};

ActionsMenu.defaultProps = {
  menuName: 'Actions',
  children: null,
};

export default ActionsMenu;
