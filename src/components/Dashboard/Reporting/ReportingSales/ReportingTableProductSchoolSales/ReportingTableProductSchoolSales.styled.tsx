import styled from 'styled-components';
import ReportingTableHead from '../../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../../shared/Table/Table.styled';

export const Head = styled(ReportingTableHead)`
  &.table-head {
    & .school-name {
      border-top-left-radius: 8px;
      width: 320px;
    }

    & .quantity {
      width: 150px;
    }

    & .percentage {
      width: 91px;
    }

    & .total-sales {
      width: 200px;
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .school-name {
        width: 620px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.school-name {
    width: 320px;
  }

  &.quantity {
    width: 150px;
  }

  &.percentage {
    width: 91px;
  }

  &.total-sales {
    width: 200px;
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.school-name {
      width: 620px;
    }
  }
`;
