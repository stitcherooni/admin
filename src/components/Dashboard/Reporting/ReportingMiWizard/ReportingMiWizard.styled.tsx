import styled from 'styled-components';
import { GreenButton } from '../../../shared/Buttons/Buttons.styled';
import ReportingTableHead from '../../../shared/Table/TableHeadSorting/TableHeadSorting';
import { Cell } from '../../../shared/Table/Table.styled';

export const Wrapper = styled.div`
  @media screen and (min-width: 1280px) {
    margin-top: 24px;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 16px;
  margin-bottom: 32px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    align-items: flex-end;
    padding-right: 0;
    margin-bottom: 24px;
  }
`;

export const Col = styled.div`
  width: 100%;

  @media screen and (min-width: 1280px) {
    &:not(.run-report) {
      min-width: 343px;
      width: 29%;
    }

    &.run-report {
      width: initial;
    }
  }
`;

export const RunReportButton = styled(GreenButton)`
  &.MuiButtonBase-root.MuiButton-root {
    width: 100%;
    padding: 15px 32px;
    font-size: 14px;
    line-height: 18px;

    & .MuiButton-endIcon {
      height: 16px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.MuiButtonBase-root.MuiButton-root {
      width: initial;
      padding: 8px 32px;
    }
  }
`;

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(ReportingTableHead)`
  &.table-head {
    & .event-name {
      width: 203px;
    }

    & .pta-name {
      width: 223px;
    }

    & .pupils,
    & .date {
      width: 161px;
    }

    & .orders {
      width: 220px;
    }

    & .actions {
      width: 102px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .event-name {
        width: 16.21%;
        min-width: 203px;
      }

      & .pta-name {
        width: 17.81%;
        min-width: 223px;
      }

      & .pupils,
      & .date {
        width: 12.85%;
        min-width: 161px;
      }

      & .orders {
        width: 17.57%;
        min-width: 220px;
      }

      & .actions {
        width: 20.12%;
        min-width: 252px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.event-name {
    width: 203px;
  }

  &.pta-name {
    width: 223px;
  }

  &.pupils,
  &.date {
    width: 161px;
  }

  &.orders {
    width: 220px;
  }

  &.actions {
    width: 102px;
  }

  @media screen and (min-width: 1280px) {
    &.event-name {
      width: 16.21%;
      min-width: 203px;
    }

    &.pta-name {
      width: 17.81%;
      min-width: 223px;
    }

    &.pupils,
    &.date {
      width: 12.85%;
      min-width: 161px;
    }

    &.orders {
      width: 17.57%;
      min-width: 220px;
    }

    &.actions {
      width: 20.12%;
      min-width: 252px;
    }
  }
`;
