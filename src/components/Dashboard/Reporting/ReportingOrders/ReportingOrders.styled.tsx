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
    & .row-id,
    & .id {
      width: 85px;
      min-width: 85px;
    }

    & .date {
      width: 105px;
    }

    & .customer-name {
      width: 150px;
    }

    & .status {
      width: 160px;
    }

    & .payment-method {
      width: 135px;
    }

    & .type {
      width: 108px;
    }

    & .orders,
    & .orders-value {
      width: 114px;
    }

    & .platform-fee,
    & .refunded {
      width: 155px;
    }

    & .actions {
      width: 150px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .date {
        width: 8.38%;
        min-width: 105px;
      }

      & .customer-name {
        width: 11.98%;
        min-width: 150px;
      }

      & .status {
        width: 12%;
        min-width: 160px;
      }

      & .payment-method {
        width: 10.14%;
        min-width: 135px;
      }

      & .type {
        width: 8.62%;
        min-width: 108px;
      }

      & .orders,
      & .orders-value {
        width: 9.1%;
        min-width: 114px;
      }

      & .platform-fee,
      & .refunded {
        width: 12.38%;
        min-width: 150px;
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

  &.row-id,
  &.id {
    width: 85px;
    min-width: 85px;
  }

  &.date {
    width: 105px;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }

  &.customer-name {
    width: 150px;
  }

  &.status {
    width: 160px;
  }

  &.payment-method {
    width: 135px;
  }

  &.type {
    width: 108px;
  }

  &.orders,
  &.orders-value {
    width: 114px;
  }

  &.platform-fee,
  &.refunded {
    width: 150px;
  }

  &.actions {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    &.date {
      width: 8.38%;
      min-width: 105px;
    }

    &.customer-name {
      width: 11.98%;
      min-width: 150px;
    }

    &.status {
      width: 12%;
      min-width: 160px;
    }

    &.payment-method {
      width: 10.14%;
      min-width: 135px;
    }

    &.type {
      width: 8.62%;
      min-width: 108px;
    }

    &.orders,
    &.orders-value {
      width: 9.1%;
      min-width: 114px;
    }

    &.platform-fee,
    &.refunded {
      width: 12.38%;
      min-width: 150px;
    }

    &.actions {
      width: 12%;
      min-width: 150px;
    }
  }
`;

export const OrderStatusBadge = styled.p`
  &.order-status {
    padding: 0 8px;
    border-radius: 8px;
    color: ${(props) => props.theme.colors.main.white};

    &.dispatched {
      background-color: ${(props) => props.theme.colors.main.green};
    }

    &.awaiting-dispatch {
      background-color: ${(props) => props.theme.colors.main.yellow};
    }

    &.refunded {
      background-color: ${(props) => props.theme.colors.main.pink};
    }
  }
`;
