import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';
import Alert from '../../../shared/Alert/Alert';
import { Input } from '../../../shared/Input/Input.styled';

export const Wrapper = styled.div`
  & .statistic {
    margin: 0 16px 24px 0;

    @media screen and (min-width: 1280px) {
      margin: 24px 0;
    }
  }
`;

export const StyledInput = styled(Input)`
  &.search-input {
    display: none;
  }

  & .MuiInputBase-root.MuiInputBase-formControl {
      height: 40px;
    }

    & .MuiInputBase-input.MuiOutlinedInput-input {
      padding: 0;

      &::placeholder {
        color: ${(props) => props.theme.colors.main.black};
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        opacity: 1;
      }
    }

  @media screen and (min-width: 1280px) {
    &.search-input {
      display: block;
    }

    width: 320px;
  }
`;

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .row-id,
    & .order-id {
      width: 120px;
    }

    & .transaction-id {
      width: 310px;
    }

    & .transaction-status,
    & .transaction-value {
      width: 125px;
    }

    & .transaction-date {
      width: 142px;
    }

    & .banked-fee,
    & .platform-fee {
      width: 155px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .row-id,
      & .order-id {
        width: 9.58%;
        min-width: 120px;
      }

      & .transaction-id {
        width: 25.31%;
        min-width: 320px;
      }

      & .transaction-status,
      & .transaction-value {
        width: 9.98%;
        min-width: 125px;
      }

      & .transaction-date {
        width: 10.54%;
        min-width: 132px;
      }

      & .banked-fee,
      & .platform-fee {
        width: 12.38%;
        min-width: 155px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.row-id,
  &.order-id {
    width: 120px;
  }

  &.transaction-id {
    width: 310px;
  }

  &.transaction-status,
  &.transaction-value {
    width: 125px;
  }

  &.transaction-date {
    width: 142px;
  }

  &.banked-fee,
  &.platform-fee {
    width: 155px;
  }

  &.not-found {
    width: 100%;
  }

  &.hidden {
    border-left: 1px solid transparent;
  }

  @media screen and (min-width: 1280px) {
    &.row-id,
    &.order-id {
      width: 9.58%;
      min-width: 120px;
    }

    &.transaction-id {
      width: 25.31%;
      min-width: 320px;
    }

    &.transaction-status,
    &.transaction-value {
      width: 9.98%;
      min-width: 125px;
    }

    &.transaction-date {
      width: 10.54%;
      min-width: 132px;
    }

    &.banked-fee,
    &.platform-fee {
      width: 12.38%;
      min-width: 155px;
    }

    &.not-found {
      width: calc(100% - 5px);
    }
  }
`;

export const StyledAlert = styled(Alert)`
  margin-bottom: 24px;
`;
