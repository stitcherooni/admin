import Button from '@mui/material/Button/Button';
import Pagination from '@mui/material/Pagination/Pagination';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media screen and (min-width: 1280px) {
    width: calc(100% - 210px);
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

export const StyledPagination = styled(Pagination)`
  & .MuiButtonBase-root.MuiPaginationItem-root {
    color: ${(props) => props.theme.colors.main.black};
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 16px;
    line-height: 24px;
    min-width: initial;
    padding: 0;

    &.Mui-selected {
      font-weight: 700;
      background-color: transparent;
    }
  }
`;

export const Wrapper = styled.div`
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
