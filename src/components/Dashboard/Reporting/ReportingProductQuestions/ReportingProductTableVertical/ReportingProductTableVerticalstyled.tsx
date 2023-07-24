import styled from 'styled-components';
import { Cell } from '../../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../../shared/Table/TableHeadSorting/TableHeadSorting';

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .id {
      width: 80px;
      border-top-left-radius: 8px;
    }

    & .booking-name,
    & .booked-for,
    & .product-name {
      width: 115px;
    }

    & .question,
    & .answer {
      width: 130px;
    }

    & .class-name,
    & .price,
    & .order-value {
      width: 100px;
    }

    & .phone,
    & .email {
      width: 142px;
    }

    & .answer {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .id {
        width: 6.38%;
        min-width: 80px;
      }

      & .booking-name,
      & .booked-for,
      & .product-name {
        width: 9.18%;
        min-width: 115px;
      }

      & .question,
      & .answer {
        width: 10.38%;
        min-width: 130px;
      }

      & .class-name,
      & .price,
      & .order-value {
        width: 7.98%;
        min-width: 100px;
      }

      & .phone,
      & .email {
        width: 11.34%;
        min-width: 142px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.id {
    width: 80px;
  }

  &.booking-name,
  &.booked-for,
  &.product-name {
    width: 115px;
  }

  &.question,
  &.answer {
    width: 130px;
  }

  &.class-name,
  &.price,
  &.order-value {
    width: 100px;
  }

  &.phone,
  &.email {
    width: 142px;
  }

  &.answer {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.id {
      width: 6.38%;
      min-width: 80px;
    }

    &.booking-name,
    &.booked-for,
    &.product-name {
      width: 9.18%;
      min-width: 115px;
    }

    &.question,
    &.answer {
      width: 10.38%;
      min-width: 130px;
    }

    &.class-name,
    &.price,
    &.order-value {
      width: 7.98%;
      min-width: 100px;
    }

    &.phone,
    &.email {
      width: 11.34%;
      min-width: 142px;
    }
  }
`;
