import styled from 'styled-components';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
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

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .message-id {
      width: 100px;
      border-top-left-radius: 8px;
    }

    & .message-to,
    & .message-sent-by,
    & .message-date-sent {
      width: 150px;
    }

    & .email {
      width: 205px;
    }

    & .message-title {
      width: 230px;
    }

    & .message-delivered,
    & .message-opened {
      width: 130px;
    }

    & .message-opened {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .message-id {
        width: 7.98%;
        min-width: 100px;
      }

      & .message-to,
      & .message-sent-by,
      & .message-date-sent {
        width: 11.98%;
        min-width: 150px;
      }

      & .email {
        width: 16.37%;
        min-width: 205px;
      }

      & .message-title {
        width: 18.37%;
        min-width: 230px;
      }

      & .message-delivered,
      & .message-opened {
        width: 11.18%;
        min-width: 140px;
      }
    }
  }
`;

export const TableCell = styled(Cell)`
  &.message-id {
    width: 100px;
  }

  &.message-to,
  &.message-sent-by,
  &.message-date-sent {
    width: 150px;
  }

  &.email {
    width: 205px;
  }

  &.message-title {
    width: 230px;
  }

  &.message-delivered,
  &.message-opened {
    width: 130px;
  }

  &.message-opened {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  @media screen and (min-width: 1280px) {
    &.message-id {
      width: 7.98%;
      min-width: 100px;
    }

    &.message-to,
    &.message-sent-by,
    &.message-date-sent {
      width: 11.98%;
      min-width: 150px;
    }

    &.email {
      width: 16.37%;
      min-width: 205px;
    }

    &.message-title {
      width: 18.37%;
      min-width: 230px;
    }

    &.message-delivered,
    &.message-opened {
      width: 11.18%;
      min-width: 140px;
    }
  }
`;

export const SuccessIcon = styled(CheckCircleOutlineIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.green};
  }
`;

export const FailedIcon = styled(CancelOutlinedIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.red};
  }
`;

export const WarningIcon = styled(WarningAmberOutlinedIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.yellow};
  }
`;
