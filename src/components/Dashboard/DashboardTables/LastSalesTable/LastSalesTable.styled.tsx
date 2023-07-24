import styled from 'styled-components';
import TableHead from '../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../shared/Table/Table.styled';

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHead)`
  &.table-head {
    & .id {
      width: 84px;
      border-top-left-radius: 8px;
    }

    & .customer-name {
      width: 200px;
    }

    & .date,
    & .value {
      width: 143px;
    }

    & .value {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }

    @media screen and (min-width: 1280px) {
      & .customer-name,
      & .date,
      & .value {
        width: 325.6px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.id {
    width: 84px;
  }

  &.customer-name {
    width: 200px;
  }

  &.date,
  &.value {
    width: 143px;
  }

  &.value {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.customer-name,
    &.date,
    &.value {
      width: 325.6px;
    }
  }
`;
