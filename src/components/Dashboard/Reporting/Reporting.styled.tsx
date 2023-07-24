import Drawer from '@mui/material/Drawer/Drawer';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  padding: 0 0 40px 16px;

  @media screen and (min-width: 1280px) {
    margin-top: 32px;
    padding-right: 0;
    padding-left: 0;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ChooseReportWrapper = styled.div`
  margin-bottom: 24px;
`;

export const Col = styled.div`
  width: 100%;
  padding-right: 16px;

  & p {
    margin-bottom: 8px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 18px;
  }

  @media screen and (min-width: 1280px) {
    & {
      min-width: 164px;
      width: 12.69%;
      padding-right: 0;
    }
  }
`;

export const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root.MuiDrawer-paper {
    top: 80px;
    left: 0;
    border-radius: 16px 0px 0px 0px;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    height: calc(100% - 80px);
  }

  @media screen and (min-width: 1280px) {
    & .MuiPaper-root.MuiDrawer-paper {
      top: 0;
      left: initial;
      height: 100%;
    }
  }
`;
