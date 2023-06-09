import React from 'react';
import Header from '../../components/Header/Header';
import { Main, MainContent } from './BasicLayout.styled';
import Footer from '../../components/Footer/Footer';
import Sidebar from '../../components/Sidebar/Sidebar';

interface BasicLayoutProps {
  children: React.ReactNode
}

const BasicLayout = ({ children }: BasicLayoutProps) => (
  <>
    <Header />
    <Main>
      <Sidebar />
      <MainContent>
        {children}
      </MainContent>
    </Main>
    <Footer />
  </>
);

export default BasicLayout;
