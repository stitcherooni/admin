import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main.background};
  height: calc(100% - 120px);

  @media screen and (min-width: 1280px) {
    display: flex;
    flex: 1;
    position: relative;
    padding-right: 72px;
    max-height: calc(100% - 120px);
  }
`;

export const MainContent = styled.div`
  width: 100%;
  
  @media screen and (min-width: 1280px) {
    width: calc(100% - 72px);
    padding-left: 40px;
  }
`;
