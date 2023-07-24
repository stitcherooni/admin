import styled from 'styled-components';
import { Cell } from '../../../shared/Table/Table.styled';
import TableHeadSorting from '../../../shared/Table/TableHeadSorting/TableHeadSorting';

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

export const TableContent = styled.div`
  overflow: hidden;
`;

export const Head = styled(TableHeadSorting)`
  &.table-head {
    & .event-name {
      width: 170px;
    }

    & .first-aider {
      width: 136px;
    }

    & .dbs-checked {
      width: 156px;
    }

    & .email {
      width: 160px;
    }

    & .phone {
      width: 200px;
    }

    & .message {
      width: 160px;
    }

    & .date {
      width: 140px;
    }

    & .actions {
      width: 150px;
    }
  }

  @media screen and (min-width: 1280px) {
    &.table-head {
      & .event-name {
        width: 13.57%;
        min-width: 170px;
      }

      & .first-aider {
        width: 10.86%;
        min-width: 136px;
      }

      & .dbs-checked {
        width: 12.46%;
        min-width: 156px;
      }

      & .email,
      & .phone,
      & .message,
      & .date {
        width: 12.77%;
        min-width: 160px;
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

  &.event-name {
    width: 170px;
  }

  &.first-aider {
    width: 136px;
  }

  &.dbs-checked {
    width: 156px;
  }

  &.email {
    width: 160px;
  }

  &.phone {
    width: 200px;
  }

  &.message {
    width: 160px;
  }

  &.date {
    width: 140px;
  }

  &.actions {
    width: 150px;
  }

  @media screen and (min-width: 1280px) {
    &.event-name {
      width: 13.57%;
      min-width: 170px;
    }

    &.first-aider {
      width: 10.86%;
      min-width: 136px;
    }

    &.dbs-checked {
      width: 12.46%;
      min-width: 156px;
    }

    &.email,
    &.phone,
    &.message,
    &.date {
      width: 12.77%;
      min-width: 160px;
    }

    &.actions {
      width: 12%;
      min-width: 150px;
    }
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
    justify-content: flex-end;
    padding: 5px 0 0 0;

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
  padding-right: 16px;

  @media screen and (min-width: 1280px) {
    padding-right: 0;
  }
`;

export const EventCaption = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & p.volunteers-count {
    color: ${(props) => props.theme.colors.main.red};
  }
`;
