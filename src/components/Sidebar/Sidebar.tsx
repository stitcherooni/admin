import React from 'react';
import { Link } from 'react-router-dom';
import {
  Item, List, RootContainer, Wrapper,
} from './Sidebar.styled';
import { sidebarButtons } from './sidebar-buttons';
import SettingsIcon from '../../assets/icons/settings-icon';

const Sidebar = () => (
  <RootContainer>
    <Wrapper>
      <List>
        {sidebarButtons.map((item) => (
          <Link to={`/dashboard/${item.id === 'dashboard' ? '' : item.id}`} key={item.id}>
            <Item
              key={item.id}
              className={item.id}
              content={item.name}
            >
              {item.img}
            </Item>
          </Link>
        ))}
      </List>
      <Item
        className="settings"
        content="Settings"
      >
        <SettingsIcon />
      </Item>
    </Wrapper>
  </RootContainer>
);

export default Sidebar;
