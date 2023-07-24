import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import Alert from '../../../shared/Alert/Alert';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';

export const Wrapper = styled.div``;

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

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .invoice-no,
    & .issue-date,
    & .due-date,
    & .status,
    & .net,
    & .vat,
    & .total,
    & .invoice {
      width: 156.5px;
    }

    & .invoice-no {
      border-top-left-radius: 8px;
    }

    & .invoice {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .invoice-no,
      & .issue-date,
      & .due-date,
      & .status,
      & .net,
      & .vat,
      & .total,
      & .invoice {
        width: 12.5%;
        min-width: 156.5px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.invoice-no,
  &.issue-date,
  &.due-date,
  &.status,
  &.net,
  &.vat,
  &.total,
  &.invoice {
    width: 156.5px;
  }

  &.invoice {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.invoice-no,
    &.issue-date,
    &.due-date,
    &.status,
    &.net,
    &.vat,
    &.total,
    &.invoice {
      width: 12.5%;
      min-width: 156.5px;
    }
  }
`;

export const StyledAlert = styled(Alert)`
  &.invoices-alert {
    margin-right: 16px;
  }

  @media screen and (min-width: 1280px) {
    &.invoices-alert {
      margin: 24px 0;
    }
  }
`;
