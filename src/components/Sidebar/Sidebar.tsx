import React, { useState } from 'react';
import {
  Item, List, RootContainer, Wrapper,
} from './Sidebar.styled';
import { sidebarButtons } from './sidebar-buttons';
import SettingsIcon from '../../assets/icons/settings-icon';

const Sidebar = () => {
  const [rect, setRect] = useState<Partial<DOMRect>>({
    y: 72,
    height: 56,
  });

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(min-width: 1280px)').matches) e.preventDefault();
    setRect((e.target as HTMLDivElement).getBoundingClientRect());
  };

  const clearRectData = (e: React.MouseEvent<HTMLElement>) => {
    if (!window.matchMedia('(min-width: 1280px)').matches) e.preventDefault();
    setRect({
      height: 0,
      y: 0,
    });
  };

  return (
    <RootContainer>
      <Wrapper>
        <List>
          {sidebarButtons.map((item) => (
            <Item
              key={item.id}
              className={item.id === 1 ? 'selected' : ''}
              content={item.name}
              onMouseEnter={handleEnter}
              onMouseLeave={clearRectData}
              y={rect.y}
              height={rect.height}
            >
              {item.img}
            </Item>
          ))}
        </List>
        <Item
          className="settings"
          onMouseEnter={handleEnter}
          onMouseLeave={clearRectData}
          y={rect.y}
          height={rect.height}
          content="Settings"
        >
          <SettingsIcon />
        </Item>
      </Wrapper>
    </RootContainer>
  );
};

export default Sidebar;
