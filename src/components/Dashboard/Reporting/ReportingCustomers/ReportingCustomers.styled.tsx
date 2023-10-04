import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';

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
    & .date
     {
      width: 140px;
    }

    & .send-email,
    & .approved,
    & .orders,
    & .order-value,
    & .delete-customer {
      width: 120px;
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
      & .date
       {
        width: 12.77%;
        min-width: 140px;
      }

      & .send-email,
      & .approved,
      & .orders,
      & .order-value,
      & .delete-customer {
        width: 12%;
        min-width: 120px;
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
  &.date
   {
    width: 140px;
  }

  &.send-email,
  &.approved,
  &.orders,
  &.order-value,
  &.delete-customer {
    width: 120px;
  }

  &.delete-customer,
  &.send-email,
  &.approved {
    display: flex;
    justify-content: center;
  }

  @media screen and (min-width: 1280px) {
    &.id,
    &.row-id {
      width: 6.7%;
      min-width: 84px;
    }

    &.first-name,
    &.last-name,
    &.date
     {
      width: 12.77%;
      min-width: 140px;
    }

    &.send-email,
    &.approved,
    &.orders,
    &.order-value,
    &.delete-customer {
      width: 12%;
      min-width: 120px;
    }
  }
`;

export const RowButton = styled(SecondaryButton)`
  &.MuiButtonBase-root.MuiButton-root {
    height: 42px;
  }

  & .MuiButton-startIcon {
    margin: 0;
  }
`