import React from 'react';
import Header from '../../components/Header/Header';
import {
  Main,
} from './UnauthorizedLayout.styled';
import Footer from '../../components/Footer/Footer';

// interface BasicLayoutProps {
//   children: React.ReactNode;
// }

const UnauthorizedLayout = () => (
  <Main>
    <Header />
    <Footer />
  </Main>
);

export default UnauthorizedLayout;
