import styled from 'styled-components';
import TableHead from '../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../shared/Table/Table.styled';

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHead)`
  &.table-head {
    & .name {
      width: 200px;
      border-top-left-radius: 8px;
    }

    & .start-date,
    & .end-date {
      width: 143px;
    }

    & .type,
    & .price,
    & .quantity-sold,
    & .quantity-left,
    & .sales {
      width: 115px;
    }

    & .sales {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }
`;

export const TableCell = styled(Cell)`
  &.name {
    width: 200px;
  }

  &.start-date,
  &.end-date {
    width: 143px;
  }

  &.type,
  &.price,
  &.quantity-sold,
  &.quantity-left,
  &.sales {
    width: 115px;
  }

  &.sales {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.hidden {
    border-left: 1px solid transparent;
  }
`;
