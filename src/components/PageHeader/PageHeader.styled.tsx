import Breadcrumbs from '@mui/material/Breadcrumbs';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

export const Title = styled.h1`
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 24px;
  line-height: 36px;
  color: ${(props) => props.theme.colors.main.black};
  margin-left: 8px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  max-height: 49px;
  padding-top: 9px;
`;

export const StyledBreadcrumbs = styled(Breadcrumbs)`
  &.MuiTypography-root.MuiBreadcrumbs-root {
    font-family: ${(props) => props.theme.fonts.mainFont};
    color: ${(props) => props.theme.colors.main.black};
    font-size: 12px;
    line-height: 18px;
    margin-left: 40px;

    & p {
      margin: 0;
    }
  }
`;
