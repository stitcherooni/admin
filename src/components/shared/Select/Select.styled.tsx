import MenuItem from '@mui/material/MenuItem/MenuItem';
import Select from '@mui/material/Select/Select';
import styled from 'styled-components';
import ArrowUpIcon from '../../../assets/icons/arrow-up-dropdown.svg';

export const StyledSelect = styled(Select)`
  &.MuiInputBase-root {
    width: 100%;
    height: 48px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    border-radius: 8px;
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.gray.gray2};
    z-index: 1;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.gray.gray1};
  }

  & .MuiSelect-select {
    padding: 13px 32px 13px 12px;
  }

  & svg {
    margin-right: 8px;
    min-width: 30px;
    position: absolute;
    z-index: -1;
    top: 10px;
    right: 0;
  }

  & .placeholder {
    margin: 1px 0 0 0;
  }
`;

export const Option = styled(MenuItem)`
  &.MuiMenuItem-root {
    width: calc(100% - 56px - 16px);
    margin-left: 16px;
    position: relative;
    padding: 6px 8px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.main.black};

    &:first-of-type::before {
      content: url(${ArrowUpIcon});
      position: absolute;
      right: -42px;
      top: 3px;
    }

    &:not(:last-of-type) {
      border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
      margin-bottom: 10px;
    }

    & .Mui-selected, &:hover {
      background-color: rgba(15, 179, 162, 0.08);
    }
  }
`;
