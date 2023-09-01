import styled from 'styled-components';
import PageHeader from '../../components/PageHeader/PageHeader';

export const Main = styled.main`
  width: 100%;
  height: calc(100% - 120px);

  @media screen and (min-width: 1280px) {
    display: flex;
    flex: 1;
    position: relative;
    max-height: calc(100% - 120px);
  }
`;

export const MainContent = styled.div`
  width: 100%;

  @media screen and (min-width: 1280px) {
    width: calc(100% - 36px);
    padding-left: 112px;
  }
`;

export const StyledPageHeader = styled(PageHeader)`
  padding: 0 16px;

  &.page-header {
    margin: 24px 0 32px 0;
  }

  @media screen and (min-width: 1280px) {
    padding: 0;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 9px;

  @media screen and (min-width: 1280px) {
    max-height: 49px;
  }
`;

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 72px;
  left: 50%;
  width: calc(100% - 32px);
  transform: translateX(-50%);
  z-index: 10;

  & .push {
    margin-bottom: 10px;
    position: relative;
  }

  & .push:last-of-type::before {
    content: '+ 5 more';
    position: absolute;
    bottom: -50px;
    right: 0;
    padding: 8px;
    border: 2px solid ${(props) => props.theme.colors.main.blue};
    border-radius: 8px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 18px;
    color: ${(props) => props.theme.colors.main.blue};
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.main.white};
  }

  @media screen and (min-width: 1280px) {
    left: initial;
    right: 0;
    width: 400px;
    transform: translateX(0);

    & .push:last-of-type::before {
      display: none;
    }
  }
`;

export const OverlayWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 110;
  width: calc(100% - 32px);
  background-color: ${(props) => props.theme.colors.main.white};
  color: ${(props) => props.theme.colors.main.black};
  font-family: ${(props) => props.theme.fonts.mainFont};
  border-radius: 8px;
  padding: 20px;
  overflow-y: auto;

  & h3 {
    font-size: 24px;
    margin-bottom: 16px;
    text-align: center;
  }

  & p {
    font-size: 16px;
    margin-bottom: 16px;
  }

  & .buttons-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }

  @media screen and (min-width: 1280px) {
    width: 711px;
    padding: 40px;

    & .buttons-wrapper {
      flex-direction: row;
    }
  }
`;
