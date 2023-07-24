import styled from 'styled-components';
import ReportingTableHead from '../../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../../shared/Table/Table.styled';

export const Head = styled(ReportingTableHead)`
  &.table-head {
    & .date {
      border-top-left-radius: 8px;
      width: 220px;
    }

    & .quantity {
      width: 150px;
    }

    & .quantity-to-date,
    & .total-sales,
    & .sales-to-date {
      width: 230px;
    }

    & .sales-to-date {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }
`;

export const TableCell = styled(Cell)`
  &.date {
    width: 220px;
  }

  &.quantity {
    width: 150px;
  }

  &.quantity-to-date,
  &.total-sales,
  &.sales-to-date {
    width: 230px;
  }

  &.sales-to-date {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }
`;
