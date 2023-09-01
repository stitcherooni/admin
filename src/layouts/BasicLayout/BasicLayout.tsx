import React, { useState } from 'react';
import { useIdleTimer } from 'react-idle-timer/legacy';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import {
  ButtonsWrapper, Main, MainContent,
  OverlayWrapper,
  StyledPageHeader,
} from './BasicLayout.styled';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { GreenButton } from '../../components/shared/Buttons/Buttons.styled';
import ButtonArrow from '../../assets/icons/button-arrow';
import { msalInstance } from '../..';
import { Overlay } from '../../components/shared/Modals/ModalFaqTooltip/ModalFaqTooltip.styled';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  const [openLogoutPopup, setLogoutPopup] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    msalInstance.logoutRedirect({ postLogoutRedirectUri: location.pathname });
  };

  const onIdle = () => {
    setLogoutPopup(false);
    handleLogout();
  };

  const onActive = () => {
    setLogoutPopup(false);
  };

  const onPrompt = () => {
    setLogoutPopup(true);
  };

  const {
    activate,
  } = useIdleTimer({
    onIdle,
    onActive,
    onPrompt,
    promptBeforeIdle: 15000,
    timeout: 900000,
    crossTab: true,
    leaderElection: true,
    syncTimers: 200,
    throttle: 500,
  });

  const handleConfirmActivity = () => {
    setLogoutPopup(false);
    activate();
  };

  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <MainContent>
          <div>
            <StyledPageHeader
              className="page-header"
              buttons={(
                <ButtonsWrapper>
                  <GreenButton endIcon={<ButtonArrow />}>List New Item</GreenButton>
                  <GreenButton endIcon={<ButtonArrow />}>Create New Event</GreenButton>
                </ButtonsWrapper>
                )}
            />
          </div>
          {children}
          { openLogoutPopup ? createPortal(
            <Overlay className="overlay">
              <OverlayWrapper>
                <h3>Are you still here?</h3>
                <div className="buttons-wrapper">
                  <GreenButton onClick={handleConfirmActivity}>Yes</GreenButton>
                </div>
              </OverlayWrapper>
            </Overlay>,
            document.body,
          ) : null }
        </MainContent>
      </Main>
      <Footer />
    </>
  );
};

export default BasicLayout;
