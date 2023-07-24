import styled from 'styled-components';
import TableHeadSorting from '../../../../shared/Table/TableHeadSorting/TableHeadSorting';
import { Cell } from '../../../../shared/Table/Table.styled';

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .id {
      width: 100px;
      border-top-left-radius: 8px;
    }

    & .booking-name,
    & .booked-for,
    & .question,
    & .answer {
      width: 150px;
    }

    & .class-name,
    & .phone,
    & .email,
    & .product-name {
      width: 145px;
    }

    & .price,
    & .order-value,
    & .terms {
      width: 105px;
    }

    & .terms {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .id {
        width: 7.98%;
        min-width: 100px;
      }

      & .booking-name,
      & .booked-for,
      & .question,
      & .answer {
        width: 11.98%;
        min-width: 150px;
      }

      & .class-name,
      & .phone,
      & .email,
      & .product-name {
        width: 11.58%;
        min-width: 145px;
      }

      & .price,
      & .order-value,
      & .terms {
        width: 8.38%;
        min-width: 105px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.id {
    width: 100px;
  }

  &.booking-name,
  &.booked-for,
  &.question,
  &.answer {
    width: 150px;
  }

  &.class-name,
  &.phone,
  &.email,
  &.product-name {
    width: 145px;
  }

  &.price,
  &.order-value,
  &.terms {
    width: 105px;
  }

  &.terms {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.id {
      width: 7.98%;
      min-width: 100px;
    }

    &.booking-name,
    &.booked-for,
    &.question,
    &.answer {
      width: 11.98%;
      min-width: 150px;
    }

    &.class-name,
    &.phone,
    &.email,
    &.product-name {
      width: 11.58%;
      min-width: 145px;
    }

    &.price,
    &.order-value,
    &.terms {
      width: 8.38%;
      min-width: 105px;
    }
  }
`;
