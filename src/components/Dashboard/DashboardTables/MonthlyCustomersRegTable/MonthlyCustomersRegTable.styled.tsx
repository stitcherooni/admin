import styled from 'styled-components';
import TableHead from '../../../shared/Table/TableHead/TableHead';
import { Cell } from '../../../shared/Table/Table.styled';

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHead)`
  &.table-head {
    & .month {
      width: 200px;
      border-top-left-radius: 8px;
    }

    & .reg {
      width: 120px;
    }

    & .reg {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }

    @media screen and (min-width: 1280px) {
      & .month,
      & .reg {
        width: 50%;
      }  
    }
  }
`;

export const TableCell = styled(Cell)`
  &.month {
    width: 200px;
  }

  &.reg {
    width: 120px;
  }

  &.reg {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.month,
    &.reg {
      width: 50%;
    }
  }
`;
