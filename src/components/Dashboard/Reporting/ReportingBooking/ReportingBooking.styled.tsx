import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import Alert from '../../../shared/Alert/Alert';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';

export const Wrapper = styled.div``;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 18px;

  & .filter-title {
    margin-bottom: 8px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

export const Col = styled.div`
  width: 100%;
  padding-right: 16px;

  @media screen and (min-width: 1280px) {
    width: 164px;
    padding-right: 0;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-right: 16px;

  & .MuiButtonBase-root.MuiButton-root {
    height: 40px;
    width: 100%;

    &.MuiButton-sizeSmall {
      height: 40px;
      padding: 4px 24px;
    }
  }

  @media screen and (min-width: 1280px) {
    width: initial;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
    }
  }
`;

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
    & .row-id {
      width: 84px;
    }

    & .first-name,
    & .last-name {
      width: 140px;
    }

    & .payment-method {
      width: 190px;
    }

    & .booking-name {
      width: 260px;
    }

    & .class {
      width: 100px;
    }

    & .booking-info {
      width: 210px;
    }

    & .sku,
    & .email {
      width: 150px;
    }

    & .product,
    & .order-id {
      width: 120px;
    }

    & .price,
    & .quantity {
      width: 98px;
    }

    & .order-date,
    & .booked-by {
      width: 140px;
    }

    & .phone {
      width: 136px;
    }

    & .actions {
      width: 150px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .row-id {
        width: 7.62%;
        min-width: 84px;
      }

      & .first-name,
      & .last-name {
        width: 12.7%;
        min-width: 140px;
      }

      & .payment-method {
        width: 17.24%;
        min-width: 190px;
      }

      & .booking-name {
        width: 23.59%;
        min-width: 260px;
      }

      & .class {
        width: 9.07%;
        min-width: 100px;
      }

      & .booking-info {
        width: 19.05%;
        min-width: 210px;
      }

      & .sku,
      & .email {
        width: 13.61%;
        min-width: 150px;
      }

      & .product,
      & .order-id {
        width: 10.88%;
        min-width: 120px;
      }

      & .price,
      & .quantity {
        width: 8.89%;
        min-width: 98px;
      }

      & .order-date,
      & .booked-by {
        width: 12.7%;
        min-width: 140px;
      }

      & .phone {
        width: 12.34%;
        min-width: 136px;
      }

      & .actions {
        width: 13.61%;
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

  &.row-id {
    width: 84px;
  }

  &.first-name,
  &.last-name {
    width: 140px;
  }

  &.payment-method {
    width: 190px;
  }

  &.booking-name {
    width: 260px;
  }

  &.class {
    width: 100px;
  }

  &.booking-info {
    width: 210px;
  }

  &.sku,
  &.email {
    width: 150px;
  }

  &.product,
  &.order-id {
    width: 120px;
  }

  &.price,
  &.quantity {
    width: 98px;
  }

  &.order-date,
  &.booked-by {
    width: 140px;
  }

  &.phone {
    width: 136px;
  }

  &.actions {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    &.row-id {
      width: 7.62%;
      min-width: 84px;
    }

    &.first-name,
    &.last-name {
      width: 12.7%;
      min-width: 140px;
    }

    &.payment-method {
      width: 17.24%;
      min-width: 190px;
    }

    &.booking-name {
      width: 23.59%;
      min-width: 260px;
    }

    &.class {
      width: 9.07%;
      min-width: 100px;
    }

    &.booking-info {
      width: 19.05%;
      min-width: 210px;
    }

    &.sku,
    &.email {
      width: 13.61%;
      min-width: 150px;
    }

    &.product,
    &.order-id {
      width: 10.88%;
      min-width: 120px;
    }

    &.price,
    &.quantity {
      width: 8.89%;
      min-width: 98px;
    }

    &.order-date,
    &.booked-by {
      width: 12.7%;
      min-width: 140px;
    }

    &.phone {
      width: 12.34%;
      min-width: 136px;
    }

    &.actions {
      width: 13.61%;
      min-width: 150px;
    }
  }

  &.hidden {
    border-color: transparent;
  }
`;

export const StyledAlert = styled(Alert)`
  &.booking-alert {
    margin-right: 16px;
  }

  @media screen and (min-width: 1280px) {
    &.booking-alert {
      margin: 24px 0 0 0;
    }
  }
`;
