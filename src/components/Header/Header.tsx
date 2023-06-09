import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import {
  StyledHeader,
  HeaderWrapper,
  RightMenu,
  StyledAvatar,
  NotificationButton,
  StyledInput,
  IconWrapper,
  MobileInputWrapper,
  MobileOverlay,
} from './Header.styled';
import HeaderLogo from '../../assets/images/organization-logo.svg';
import BellIconRounded from '../../assets/icons/bell-icon-rounded';
import ZoomIcon from '../../assets/icons/zoom-icon';
import ZoomIconSmall from '../../assets/icons/zoom-icon-small';
import ZoomCloseIcon from '../../assets/icons/zoom-close-icon';

// interface HeaderProps {

// }

const Header = () => {
  const [isMobileSearchShown, setIsMobileSearchShown] = useState(false);
  const toggleMobileSearchVisibility = () => {
    setIsMobileSearchShown(!isMobileSearchShown);
  };

  return (
    <HeaderWrapper>
      <StyledHeader>
        <img src={HeaderLogo} alt="logo" />
        <RightMenu>
          {!isMobileSearchShown ? (
            <IconWrapper className="zoom-icon" onClick={toggleMobileSearchVisibility}>
              <ZoomIcon />
            </IconWrapper>
          ) : null}
          {isMobileSearchShown ? (
            <IconWrapper className="zoom-close-icon" onClick={toggleMobileSearchVisibility}>
              <ZoomCloseIcon />
            </IconWrapper>
          ) : null}
          {isMobileSearchShown ? (
            <>
              <MobileInputWrapper>
                <StyledInput
                  placeholder="Search for events, listings, customers etc"
                  InputProps={{
                    endAdornment: <InputAdornment position="end"><ZoomIconSmall /></InputAdornment>,
                  }}
                />
              </MobileInputWrapper>
              <MobileOverlay onClick={toggleMobileSearchVisibility} />
            </>
          ) : null}
          <StyledInput
            placeholder="Search for events, listings, customers etc"
            InputProps={{
              endAdornment: <InputAdornment position="end"><ZoomIconSmall /></InputAdornment>,
            }}
            className="search-input"
          />
          <NotificationButton badgeContent={10}>
            <BellIconRounded />
          </NotificationButton>
          <StyledAvatar>OL</StyledAvatar>
        </RightMenu>
      </StyledHeader>
    </HeaderWrapper>
  );
};

export default Header;
