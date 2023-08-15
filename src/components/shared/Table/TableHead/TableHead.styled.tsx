import styled from 'styled-components';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

export const StyledHead = styled(TableHead)``;

export const Row = styled(TableRow)`
  &.MuiTableRow-root {
    display: flex;
    width: 100%;
  }
`;

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
`;
