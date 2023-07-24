import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';

export const Wrapper = styled.div`
  & .statistic {
    margin: 0 16px 24px 0;

    @media screen and (min-width: 1280px) {
      margin: 24px 0 24px 0;
    }
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  & .MuiButtonBase-root.MuiButton-root {
    height: 40px;
    width: 100%;

    &.MuiButton-sizeSmall {
      height: 40px;
      padding: 4px 24px;
    }
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: initial;

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
    & .id,
    & .row-id {
      width: 84px;
    }

    & .date,
    & .customer-name,
    & .event-name,
    & .type,
    & .refunded,
    & .cost,
    & .gift-aid {
      width: 130px;
    }

    & .paypal-email {
      width: 190px;
    }

    & .product,
    & .paypal-id,
    & .line-price {
      width: 136px;
    }

    & .quantity {
      width: 90px;
    }

    & .gift-aid {
      color: ${(props) => props.theme.colors.main.green};
    }

    & .cost {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
    }

    & .refunded {
      color: ${(props) => props.theme.colors.main.red};
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .id,
      & .row-id {
        width: 6.7%;
        min-width: 84px;
      }

      & .date,
      & .customer-name,
      & .event-name,
      & .type,
      & .refunded,
      & .cost,
      & .gift-aid {
        width: 10.38%;
        min-width: 130px;
      }

      & .paypal-email {
        width: 15.17%;
        min-width: 190px;
      }

      & .product,
      & .paypal-id {
        width: 10.86%;
        min-width: 136px;
      }

      & .quantity {
        width: 7.18%;
        min-width: 90px;
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

  &.date,
  &.customer-name,
  &.event-name,
  &.type,
  &.refunded,
  &.cost,
  &.gift-aid {
    width: 130px;
  }

  &.paypal-email {
    width: 190px;
  }

  &.product,
  &.paypal-id,
  &.line-price {
    width: 136px;
  }

  &.quantity {
    width: 90px;
  }

  &.gift-aid {
    color: ${(props) => props.theme.colors.main.green};
  }

  &.cost {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.refunded {
    color: ${(props) => props.theme.colors.main.red};
  }

  @media screen and (min-width: 1280px) {
    &.id,
    &.row-id {
      width: 6.7%;
      min-width: 84px;
    }

    &.date,
    &.customer-name,
    &.event-name,
    &.type,
    &.refunded,
    &.cost,
    &.gift-aid {
      width: 10.38%;
      min-width: 130px;
    }

    &.paypal-email {
      width: 15.17%;
      min-width: 190px;
    }

    &.product,
    &.paypal-id {
      width: 10.86%;
      min-width: 136px;
    }

    &.quantity {
      width: 7.18%;
      min-width: 90px;
    }
  }

  &.hidden {
    border-color: transparent;
  }
`;
