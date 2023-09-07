import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import Alert from '../../../shared/Alert/Alert';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { BaseButton } from '../../../shared/Buttons/Buttons.styled';
import { Input } from '../../../shared/Input/Input.styled';

export const Wrapper = styled.div``;

export const Filters = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 24px 0;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 18px;

  & .filter-title {
    margin-bottom: 8px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

export const Col = styled.div`
  width: 100%;
  padding-right: 16px;

  @media screen and (min-width: 1280px) {
    width: 164px;
    padding-right: 0;
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding-right: 16px;

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
    justify-content: space-between;
    align-items: flex-end;
    justify-content: flex-end;
    padding-right: 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
    }
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

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .first-name,
    & .last-name,
    & .booked-by,
    & .class {
      width: 140px;
    }

    & .medical {
      width: 315px;
    }

    & .phone {
      width: 206px;
      border-right: 1px solid rgba(122, 81, 145, 0.4);
      border-top-right-radius: 8px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .first-name,
      & .last-name,
      & .booked-by,
      & .class {
        width: 12.7%;
        min-width: 140px;
      }

      & .medical {
        width: 28.58%;
        min-width: 315px;
      }

      & .phone {
        width: 18.69%;
        min-width: 206px;
      }
    }
  }
`;

export const TableCell = styled(Cell)<{ extended?: boolean }>`
  &.checkbox {
    width: 40px;
    min-width: 40px;
  }

  &.first-name,
  &.last-name,
  &.booked-by,
  &.class {
    width: 140px;
  }

  &.medical {
    width: 315px;
  }

  &.phone {
    width: 206px;
    border-right: 1px solid rgba(122, 81, 145, 0.4);
  }

  &.sum {
    color: ${(props) => props.theme.colors.main.brightGreen};
    background-color: ${(props) => props.theme.colors.main.lightGreen};
  }

  &.not-found {
    width: 100%;
  }

  &.hidden {
    border-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    &.first-name,
    &.last-name,
    &.booked-by,
    &.class {
      width: 12.7%;
      min-width: 140px;
    }

    &.medical {
      width: 28.58%;
      min-width: 315px;
    }

    &.phone {
      width: 18.69%;
      min-width: 206px;
    }
    
    &.not-found {
      width: ${(props) => (!props.extended ? '85.37%' : 'calc(100% - 33px)')};
    }
  }
`;

export const StyledAlert = styled(Alert)`
  margin-top: 16px;

  &.booking-alert {
    margin-right: 16px;
  }

  @media screen and (min-width: 1280px) {
    &.booking-alert {
      margin: 24px 0 0 0;
    }
  }
`;

export const TableFooter = styled(TablePagination)``;

export const TableWrapper = styled.div`
  overflow-x: scroll;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    overflow-x: initial;

    & .table-footer {
      width: 85.37%;
    }
  }
`;

export const Button = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    padding: 0;
    border: none;
    text-decoration: underline;
    color: ${(props) => props.theme.colors.main.purple};
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
