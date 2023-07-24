import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
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

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .row-id {
      width: 84px;
    }

    & .first-name,
    & .last-name,
    & .winning-prize {
      width: 120px;
    }

    & .product-name,
    & .booking-info {
      width: 150px;
    }

    & .order-id,
    & .scan-date {
      width: 115px;
    }

    & .ticket-id {
      width: 125px;
    }

    & .actions {
      width: 150px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .row-id {
        min-width: 84px;
      }

      & .first-name,
      & .last-name,
      & .winning-prize {
        width: 9.58%;
        min-width: 120px;
      }

      & .product-name,
      & .booking-info {
        width: 15%;
        min-width: 150px;
      }

      & .order-id,
      & .scan-date {
        width: 9.18%;
        min-width: 115px;
      }

      & .ticket-id {
        width: 9.98%;
        min-width: 125px;
      }

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

  &.row-id {
    width: 84px;
  }

  &.first-name,
  &.last-name,
  &.winning-prize {
    width: 120px;
  }

  &.product-name,
  &.booking-info {
    width: 150px;
  }

  &.order-id,
  &.scan-date {
    width: 115px;
  }

  &.ticket-id {
    width: 125px;
  }

  &.actions {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    &.row-id {
      min-width: 84px;
    }

    &.first-name,
    &.last-name,
    &.winning-prize {
      width: 9.58%;
      min-width: 120px;
    }

    &.product-name,
    &.booking-info {
      width: 15%;
      min-width: 150px;
    }

    &.order-id,
    &.scan-date {
      width: 9.18%;
      min-width: 115px;
    }

    &.ticket-id {
      width: 9.98%;
      min-width: 125px;
    }

    &.actions {
      width: 12%;
      min-width: 150px;
    }
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 16px;
  justify-content: space-between;
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
    align-items: center;
    justify-content: initial;
    padding: 5px 0 0 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
    }
  }
`;
