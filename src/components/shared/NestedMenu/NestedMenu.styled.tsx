import styled from 'styled-components';
import Menu from '@mui/material/Menu/Menu';
import { BaseButton } from '../Buttons/Buttons.styled';

export const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 14px;
  line-height: 21px;
  min-width: 164px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.main.white};
`;

export const ListItem = styled.li`
  padding: 8px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray8};
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & .sub-list {
    display: none;
  }

  &.list-item.selected {
    border-bottom: 1px solid ${(props) => props.theme.colors.main.black};
    transition: all 0.3s;

    & .list-item-title {
      font-weight: 700;
    }

    & .arrow-right path {
      fill: ${(props) => props.theme.colors.main.black};
    }
  }

  &.list-item:hover {
    border-bottom: 1px solid ${(props) => props.theme.colors.main.black};
    transition: all 0.3s;

    & .list-item-title {
      font-weight: 700;
    }

    & .arrow-right path {
      fill: ${(props) => props.theme.colors.main.black};
    }

    & .sub-list {
      display: block;
    }
  }

  &.sub-item.selected,
  &.sub-item:hover {
    border-bottom: 1px solid ${(props) => props.theme.colors.main.black};
    transition: all 0.3s;

    & .list-item-subtitle {
      font-weight: 700;
    }

    & .arrow-right path {
      fill: ${(props) => props.theme.colors.main.black};
    }
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
  }
`;

export const ListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const SubList = styled(List)`
  padding: 8px;
  box-shadow: 0px 4px 24px 0px rgba(35, 96, 146, 0.16);
  margin-top: 8px;

  @media screen and (min-width: 1280px) {
    position: absolute;
    top: -8px;
    left: 100%;
    margin-top: 0;
    min-width: 230px;
  }
`;

export const FilterButton = styled(BaseButton)`
  &.MuiButtonBase-root.MuiButton-root {
    color: ${(props) => props.theme.colors.main.black};
    border: 1px solid ${(props) => props.theme.colors.main.black};
    border-radius: 8px;
    height: 48px;
    width: 164px;
    justify-content: space-between;
    padding-right: 12px;
    width: 100%;
  }

  & p {
    margin-bottom: 0;
    width: 90%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  @media screen and (min-width: 1280px) {
    &.MuiButtonBase-root.MuiButton-root {
      width: 164px;
    }
  }
`;

export const SortMenuFilter = styled(Menu)`
  & .MuiPaper-root.MuiPopover-paper.MuiMenu-paper {
    width: 100%;
    padding: 0;
    box-shadow: 0px 4px 24px 0px rgba(35, 96, 146, 0.16);
    overflow: initial;
    border-radius: 8px;
  }

  @media screen and (min-width: 1280px) {
    & .MuiPaper-root.MuiPopover-paper.MuiMenu-paper {
      width: initial;
    }
  }
`;
