import styled from 'styled-components';
import ReportingTableHead from '../../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../../shared/Table/Table.styled';

export const Head = styled(ReportingTableHead)`
  &.table-head {
    & .percentage {
      width: 91px;
      border-top-left-radius: 8px;
    }

    & .quantity,
    & .product-count {
      width: 150px;
    }

    & .product-count {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .quantity,
      & .product-count {
        width: 485px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.percentage {
    width: 91px;
  }

  &.quantity,
  &.product-count {
    width: 150px;
  }

  &.product-count {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.quantity,
    &.product-count {
      width: 485px;
    }
  }
`;
