import styled from 'styled-components';
import Alert from '../shared/Alert/Alert';

export const Wrapper = styled.div`

`;

export const DashboardOverview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-bottom: 18px;

  @media screen and (min-width: 1280px) {
    padding: 0;
    margin-bottom: 24px;
  }
`;

export const OverviewTitle = styled.p`
  font-family: ${(props) => props.theme.fonts.mainFont};
  color: ${(props) => props.theme.colors.main.black};
  font-size: 16px;
  line-height: 24px;

  @media screen and (min-width: 1280px) {
    font-size: 18px;
    line-height: 27px;
  }
`;

export const HorizontalAdv = styled.div`
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 14px;
  margin: 16px 27px 0 27px;

  & p {
    color: ${(props) => props.theme.colors.main.black};  
    text-transform: uppercase;
  }

  & img {
    max-width: 100%;
    height: auto;
  }

  & .link-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  & a {
    color: ${(props) => props.theme.colors.main.purple};  
    text-decoration: underline;
  }

  @media screen and (min-width: 1280px) {
    margin: 16px auto 0 auto;
    max-width: 728px;
  }
`;

export const UserActivityWrapper = styled.div`
  margin-top: 40px;
  padding: 0 16px;
  overflow: hidden;

  @media screen and (min-width: 1280px) {
    padding: 0;
    margin-left: -16px;
  }
`;

export const UserActivity = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 45px;
  scrollbar-color: transparent;
  gap: 48px;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    overflow-x: scroll;
    padding-left: 16px;
    gap: 41px;
  }
`;

export const ProductName = styled(Alert)`
  &.product-name {
    padding: 12px 16px;
  }
`;

export const TablesContainer = styled.div`
  padding-left: 16px;
  margin: 32px 0;

  @media screen and (min-width: 1280px) {
    padding-left: 0;
  }
`;
