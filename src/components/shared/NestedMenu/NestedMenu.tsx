import React from 'react';
import {
  FilterButton,
  List, ListItem, ListItemWrapper, SortMenuFilter, SubList,
} from './NestedMenu.styled';
import ShevronRight from '../../../assets/icons/shevron-right';
import ShevronDown from '../../../assets/icons/shevron-down';
import { theme } from '../../../styles/defaultTheme';

interface MenuItemProps {
  value: number | string;
  label: number | string;
}

interface MenuItem extends MenuItemProps {
  subMenu?: MenuItemProps[];
}

interface NestedMenuProps {
  options: MenuItem[];
  handleChoose: (e) => void;
  rootId: number | null | string;
  buttonLabel: number | null | string;
  selectedId: number | null | string;
  placeholder?: string;
}

const NestedMenu = (props: NestedMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectItem = (e) => {
    props.handleChoose(e);
    setAnchorEl(null);
  };

  return (
    <>
      <FilterButton
        endIcon={<ShevronDown color={theme.colors.main.black} />}
        disableRipple
        onClick={handleClick}
      >
        <p>{props.buttonLabel ? props.buttonLabel : props.placeholder}</p>
      </FilterButton>
      <SortMenuFilter
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        {!props.options.length ? null : (
          <List>
            {props.options.map((item) => (
              <ListItem className={`list-item ${item.value.toString() === props.rootId ? 'selected' : ''}`} key={item.value}>
                <ListItemWrapper>
                  <span className="list-item-title">{item.label}</span>
                  <ShevronRight className="arrow-right" />
                </ListItemWrapper>
                {item.subMenu && item.subMenu.length ? (
                  <SubList className="sub-list">
                    {item.subMenu?.map((option) => (
                      <ListItem
                        className={`list-item sub-item ${option.value.toString() === props.selectedId ? 'selected' : ''}`}
                        key={option.value}
                        onClick={selectItem}
                        data-rootid={item.value}
                        data-value={option.value}
                        data-label={option.label}
                      >
                        <ListItemWrapper>
                          <span className="list-item-subtitle">{option.label}</span>
                        </ListItemWrapper>
                      </ListItem>
                    ))}
                  </SubList>
                ) : null}
              </ListItem>
            ))}
          </List>
        )}
      </SortMenuFilter>
    </>
  );
};

NestedMenu.defaultProps = {
  placeholder: 'Select',
};

export default NestedMenu;
