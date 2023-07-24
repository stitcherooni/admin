import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';

export const Wrapper = styled.div`
  & .statistic {
    margin: 0 16px 24px 0;

    @media screen and (min-width: 1280px) {
      margin: 24px 0;
    }
  }
`;

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .id,
    & .row-id {
      width: 84px;
    }

    & .first-name,
    & .last-name,
    & .date {
      width: 140px;
    }

    & .approved,
    & .orders,
    & .order-value,
    & .actions {
      width: 150px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .id,
      & .row-id {
        width: 6.7%;
        min-width: 84px;
      }

      & .first-name,
      & .last-name,
      & .date {
        width: 12.77%;
        min-width: 140px;
      }

      & .approved,
      & .orders,
      & .order-value,
      & .actions {
        width: 12%;
        min-width: 150px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.checkbox {
    width: 40px;
    min-width: 40px;
  }

  &.id,
  &.row-id {
    width: 84px;
  }

  &.first-name,
  &.last-name,
  &.date {
    width: 140px;
  }

  &.approved,
  &.orders,
  &.order-value,
  &.actions {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    &.id,
    &.row-id {
      width: 6.7%;
      min-width: 84px;
    }

    &.first-name,
    &.last-name,
    &.date {
      width: 12.77%;
      min-width: 140px;
    }

    &.approved,
    &.orders,
    &.order-value,
    &.actions {
      width: 12%;
      min-width: 150px;
    }
  }
`;
