import styled from 'styled-components';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import { Input } from '../Input/Input.styled';

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const TableWrapper = styled.div`
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    overflow-x: initial;
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
    padding-right: 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
    }
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
  border-bottom: 1px solid rgba(122, 81, 145, 0.4);
  word-break: break-all;
  min-height: 38px;

  & {
    white-space: pre-wrap;
    overflow: hidden;
  }

  & a {
    font-weight: 700;
    color: ${(props) => props.theme.colors.main.purple};
  }

  &.checkbox {
    width: 40px;
    padding: 0;
  }

  &.actions {
    border-left: 1px solid rgba(122, 81, 145, 0.4);
    border-bottom: 1px solid rgba(122, 81, 145, 0.4);
    border-right: 1px solid rgba(122, 81, 145, 0.4);
    justify-content: flex-end;
    padding-right: 24px;
  }
`;

export const Row = styled(TableRow)`
  &.MuiTableRow-root {
    display: flex;
    width: 100%;
  }

  & td:first-of-type {
    border-left: 1px solid rgba(122, 81, 145, 0.4);
  }

  & td:last-of-type {
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.last {
    & td:first-of-type {
      border-bottom-left-radius: 8px;
    }

    & td:last-of-type {
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-bottom-right-radius: 8px;
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  &.MuiButtonBase-root.MuiCheckbox-root {
    margin: 0 auto;
    padding: 4px 8px;
    color: ${(props) => props.theme.colors.main.purple};

    &.Mui-checked {
      color: ${(props) => props.theme.colors.main.purple};
    }
  }
`;

export const SortButton = styled(IconButton)`
  &.MuiButtonBase-root.MuiIconButton-root {
    width: 20px;
    height: 20px;
    padding: 0;
    min-width: 20px;
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export const StyledTableWrapper = styled(TableContainer)``;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 1280px) {
    width: calc(100% - 202px);
  }
`;

export const ChangePageButton = styled(Button)`
  &.MuiButtonBase-root.MuiButton-root {
    color: ${(props) => props.theme.colors.main.black};
    font-family: ${(props) => props.theme.fonts.mainFont};
    padding: 0;

    &.Mui-disabled {
      color: ${(props) => props.theme.colors.gray.gray4};
    }
  }
`;

// export const TablePagination = styled(Pagination)`
//   & .MuiButtonBase-root.MuiPaginationItem-root {
//     color: ${(props) => props.theme.colors.main.black};
//     font-family: ${(props) => props.theme.fonts.mainFont};
//     font-size: 16px;
//     line-height: 24px;
//     min-width: initial;
//     padding: 0;

//     &.Mui-selected {
//       font-weight: 700;
//       background-color: transparent;
//     }
//   }
// `;

export const TableFooter = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  gap: 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
  }
`;

export const StyledSelect = styled(Select)`
  &.MuiInputBase-root {
    width: 98px;
    height: 24px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    border-radius: 8px;
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.main.green};
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.main.green}!important;
  }

  & .MuiSelect-select {
    padding: 3px 15px;
  }

  & svg {
    margin-right: 7px;
    width: 20px;
    position: absolute;
    z-index: -1;
    top: -2px;
    right: 0;

    & path {
      stroke: ${(props) => props.theme.colors.main.green};
    }
  }
`;

export const Option = styled(MenuItem)`
  &.MuiMenuItem-root {
    width: 196px;
    margin: 0 8px;
    position: relative;
    padding: 4px 8px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 21px;
    color: ${(props) => props.theme.colors.main.black};
    text-align: right;
    justify-content: flex-end;

    &:not(:last-of-type) {
      border-bottom: 1px solid ${(props) => props.theme.colors.main.green};
      margin-bottom: 4px;
    }

    &.Mui-selected,
    &:hover {
      background-color: rgba(15, 179, 162, 0.08);
    }
  }
`;

export const DropdownWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 18px;

  @media screen and (min-width: 1280px) {
  }
`;

export const SearchInput = styled(Input)`
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
    width: 364px;
  }
`;
