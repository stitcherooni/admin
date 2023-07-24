import styled from 'styled-components';
import { Cell } from '../../../../shared/Table/Table.styled';
import TableHead from '../../../../shared/Table/TableHead/TableHead';

export const Head = styled(TableHead)`
  &.table-head {
    & .row-id {
      width: 100px;
      border-top-left-radius: 8px;
    }

    & .product-name {
      width: 314px;
    }

    & .quantity,
    & .target-quantity {
      width: 100px;
    }

    & .difference,
    & .attaintment,
    & .total-sales {
      width: 149px;
    }

    & .total-sales {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }
`;

export const TableCell = styled(Cell)`
  &.row-id {
    width: 100px;
  }

  &.product-name {
    width: 314px;
  }

  &.quantity,
  &.target-quantity {
    width: 100px;
  }

  &.difference,
  &.attaintment,
  &.total-sales {
    width: 149px;
  }

  &.total-sales {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.accent {
    color: ${(props) => props.theme.colors.main.green};
  }
`;
