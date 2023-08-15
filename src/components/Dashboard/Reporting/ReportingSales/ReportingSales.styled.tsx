import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import Alert from '../../../shared/Alert/Alert';

export const Wrapper = styled.div`
  & .statistic {
    margin: 0 16px 24px 0;

    @media screen and (min-width: 1280px) {
      margin: 24px 0 24px 0;
    }
  }
`;

export const TableFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  margin-bottom: 32px;

  @media screen and (min-width: 1280px) {
    padding-right: 0;
    margin-bottom: 24px;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Col = styled.div`
  width: 100%;

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
    }
  }
`;

export const TableCaption = styled.div`
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: initial;
  }
`;

export const TableContent = styled.div`
  overflow: hidden;
`;

export const SalesAccordion = styled(Accordion)<{ expanded: boolean }>`
  &.MuiPaper-root.MuiAccordion-root {
    box-shadow: none;
    margin-bottom: 16px;

    &::before {
      display: none;
    }
  }

  & .MuiButtonBase-root.MuiAccordionSummary-root {
    background-color: ${(props) => props.theme.colors.gray.gray8};
    box-shadow: none;
    border-radius: 4px;

    &.Mui-expanded {
      min-height: 43px;
    }
  }

  & .MuiAccordionSummary-content {
    & h3 {
      font-family: ${(props) => props.theme.fonts.mainFont};
      font-size: 18px;
      font-weight: ${(props) => (props.expanded ? 700 : 400)};
    }

    &.Mui-expanded {
      margin: 0;
    }
  }

  & .MuiAccordionDetails-root {
    padding: 0;
  }

  & .MuiCollapse-wrapperInner {
    background-color: ${(props) => props.theme.colors.main.background};
    padding-top: 16px;
  }

  @media screen and (min-width: 1280px) {
    &.MuiPaper-root.MuiAccordion-root {
      width: 1061px;
    }
  }
`;

export const ProductName = styled(Alert)`
  &.product-name {
    padding: 12px 16px;
  }
`;
