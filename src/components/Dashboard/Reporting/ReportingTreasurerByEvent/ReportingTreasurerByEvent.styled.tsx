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

export const TableFilters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 16px;
  margin-bottom: 32px;

  @media screen and (min-width: 1280px) {
    padding-right: 0;
    margin-bottom: 24px;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Col = styled.div`
  width: 100%;

  & .filter-title {
    margin-bottom: 8px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 18px;
  }

  @media screen and (min-width: 1280px) {
    & {
      min-width: 164px;
      width: 12.69%;
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
    width: initial;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    justify-content: initial;

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
    & .type,
    & .refunded,
    & .platform-fee-paid,
    & .fee-paid {
      width: 130px;
    }

    & .customer-address {
      width: 270px;
    }

    & .product,
    & .fee-not-paid {
      width: 150px;
    }

    & .transaction-id,
    & .platform-fees-not-paid {
      width: 170px;
    }

    & .transaction-email {
      width: 200px;
    }

    & .quantity {
      width: 90px;
    }

    & .line-price {
      width: 136px;
    }

    & .gift-aid {
      width: 120px;
      color: ${(props) => props.theme.colors.main.green};
    }

    & .refunded {
      color: ${(props) => props.theme.colors.main.red};
    }

    & .platform-fee-paid {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
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
      & .type,
      & .refunded,
      & .platform-fee-paid,
      & .fee-paid {
        width: 10.38%;
        min-width: 130px;
      }

      & .customer-address {
        width: 21.56%;
        min-width: 270px;
      }

      & .product,
      & .fee-not-paid {
        width: 11.58%;
        min-width: 150px;
      }

      & .transaction-id,
      & .platform-fees-not-paid {
        width: 13.57%;
        min-width: 170px;
      }

      & .transaction-email {
        width: 15.97%;
        min-width: 200px;
      }

      & .quantity {
        width: 7.18%;
        min-width: 90px;
      }

      & .line-price {
        width: 10.86%;
        min-width: 136px;
      }

      & .gift-aid {
        width: 9.58%;
        min-width: 120px;
        color: ${(props) => props.theme.colors.main.green};
      }

      & .refunded {
        color: ${(props) => props.theme.colors.main.red};
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
  &.type,
  &.refunded,
  &.platform-fee-paid,
  &.fee-paid {
    width: 130px;
  }

  &.customer-address {
    width: 270px;
  }

  &.product,
  &.fee-not-paid {
    width: 150px;
  }

  &.transaction-id,
  &.platform-fees-not-paid {
    width: 170px;
  }

  &.transaction-email {
    width: 200px;
  }

  &.quantity {
    width: 90px;
  }

  &.line-price {
    width: 136px;
  }

  &.gift-aid {
    width: 120px;
    color: ${(props) => props.theme.colors.main.green};
  }

  &.platform-fee-paid {
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
    &.type,
    &.refunded,
    &.platform-fee-paid,
    &.fee-paid {
      width: 10.38%;
      min-width: 130px;
    }

    &.customer-address {
      width: 21.56%;
      min-width: 270px;
    }

    &.product,
    &.fee-not-paid {
      width: 11.58%;
      min-width: 150px;
    }

    &.transaction-id,
    &.platform-fees-not-paid {
      width: 13.57%;
      min-width: 170px;
    }

    &.transaction-email {
      width: 15.97%;
      min-width: 200px;
    }

    &.quantity {
      width: 7.18%;
      min-width: 90px;
    }

    &.line-price {
      width: 10.86%;
      min-width: 136px;
    }

    &.gift-aid {
      width: 9.58%;
      min-width: 120px;
      color: ${(props) => props.theme.colors.main.green};
    }

    &.refunded {
      color: ${(props) => props.theme.colors.main.red};
    }
  }

  &.hidden {
    border-left-color: transparent;
  }
`;
