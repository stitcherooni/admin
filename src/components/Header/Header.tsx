import React, { SyntheticEvent, useMemo, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
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
  OverlayWrapper,
} from './Header.styled';
import HeaderLogo from '../../assets/images/organization-logo.svg';
import BellIconRounded from '../../assets/icons/bell-icon-rounded';
import ZoomIcon from '../../assets/icons/zoom-icon';
import ZoomIconSmall from '../../assets/icons/zoom-icon-small';
import ZoomCloseIcon from '../../assets/icons/zoom-close-icon';
import { GreenButton, SecondaryButton } from '../shared/Buttons/Buttons.styled';
import { b2cPolicies, loginRequest } from '../../authConfig';
import ActionsMenu from '../shared/ActionsMenu/ActionsMenu';
import { Overlay } from '../shared/Modals/ModalFaqTooltip/ModalFaqTooltip.styled';
import { msalInstance } from '../..';

const Header = () => {
  const [isMobileSearchShown, setIsMobileSearchShown] = useState(false);
  const toggleMobileSearchVisibility = () => {
    setIsMobileSearchShown(!isMobileSearchShown);
  };
  const location = useLocation();

  const { inProgress } = useMsal();

  const handleLogin = () => {
    msalInstance
      .loginPopup({
        ...loginRequest,
        redirectUri: '/',
      })
      .catch((error) => console.log(error));
  };

  const [openLogoutPopup, setLogoutPopup] = useState(false);

  const handleLogout = () => {
    msalInstance.logoutRedirect({ postLogoutRedirectUri: location.pathname });
    // msalInstance.logoutPopup();
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      msalInstance.acquireTokenRedirect(b2cPolicies.authorities.editProfile as RedirectRequest);
    }
  };

  const userMenuOptions = useMemo(() => [
    { value: 'edit', label: 'Edit profile', handleClick: handleProfileEdit },
    { value: 'logout', label: 'Logout', handleClick: () => setLogoutPopup(true) },
  ], []);

  const handleCloseLogoutPopup = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      setLogoutPopup(false);
    }
  };

  return (
    <HeaderWrapper>
      <StyledHeader>
        <img src={HeaderLogo} alt="logo" />
        <AuthenticatedTemplate>
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
            <ActionsMenu options={userMenuOptions}>
              <StyledAvatar>OL</StyledAvatar>
            </ActionsMenu>
          </RightMenu>
          { openLogoutPopup ? (
            createPortal(
              <Overlay onClick={handleCloseLogoutPopup} className="overlay">
                <OverlayWrapper>
                  <h3>Do you want to log out?</h3>
                  <div className="buttons-wrapper">
                    <GreenButton onClick={handleLogout}>Logout</GreenButton>
                    <SecondaryButton onClick={() => setLogoutPopup(false)}>Cancel</SecondaryButton>
                  </div>
                </OverlayWrapper>
              </Overlay>,
              document.body,
            )
          ) : null }
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <RightMenu>
            <GreenButton onClick={handleLogin}>Login</GreenButton>
          </RightMenu>
        </UnauthenticatedTemplate>
      </StyledHeader>
    </HeaderWrapper>
  );
};

export default Header;
