import styled from 'styled-components';
import TableRow from '@mui/material/TableRow/TableRow';
import IconButton from '@mui/material/IconButton/IconButton';
import TableHead from '@mui/material/TableHead/TableHead';

export const StyledHead = styled(TableHead)``;

export const Cell = styled.td`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 21px;
  border-left: 1px solid rgba(122, 81, 145, 0.4);
  border-top: 1px solid rgba(122, 81, 145, 0.4);
  border-bottom: 1px solid rgba(122, 81, 145, 0.4);
  justify-content: space-between;

  &.checkbox {
    width: 40px;
    min-width: 40px;
    padding: 0;
    border-radius: 8px 0px 0px 0px;
  }

  &.actions {
    border-radius: 0px 8px 0px 0px;
    justify-content: flex-end;
    padding-right: 24px;
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }
`;

export const Row = styled(TableRow)`
  &.MuiTableRow-root {
    display: flex;
    width: 100%;
  }
`;

export const SortButton = styled(IconButton)`
  &.MuiButtonBase-root.MuiIconButton-root {
    width: 16px;
    height: 16px;
    padding: 0;
    min-width: 16px;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export const SortButtonWrapper = styled.div`
  display: flex;
  width: 32px;
  align-items: center;
`;
