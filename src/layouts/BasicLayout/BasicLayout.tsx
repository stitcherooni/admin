import React from 'react';
import Header from '../../components/Header/Header';
import {
  ButtonsWrapper, Main, MainContent,
  StyledPageHeader,
} from './BasicLayout.styled';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';
import { GreenButton } from '../../components/shared/Buttons/Buttons.styled';
import ButtonArrow from '../../assets/icons/button-arrow';

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout = ({ children }: BasicLayoutProps) => {
  return (
    <>
      <Header />
      <Sidebar />
      <Main>
        <MainContent>
          {/* <NotificationWrapper>
            <Notification className="push" />
            <Notification className="push" />
          </NotificationWrapper> */}
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
        </MainContent>
      </Main>
      <Footer />
    </>
  );
};

export default BasicLayout;
