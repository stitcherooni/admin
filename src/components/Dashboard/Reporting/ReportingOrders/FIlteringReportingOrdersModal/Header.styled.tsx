import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import styled from 'styled-components';
import { Input } from '../shared/Input/Input.styled';

export const HeaderWrapper = styled.div`
  min-height: 64px;

  @media screen and (min-width: 1280px) {
    min-height: 72px;
  }
`;

export const StyledHeader = styled.header`
  padding: 0 16px;
  height: 64px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.colors.main.white};

  @media screen and (min-width: 1280px) {
    padding: 0 72px;
    height: 72px;
  }
`;

export const RightMenu = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.div`
  &.zoom-icon,
  &.zoom-close-icon {
    margin-right: 12px;
  }

  @media screen and (min-width: 1280px) {
    &.zoom-icon,
    &.zoom-close-icon {
      display: none;
    }
  }
`;

export const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    background-color: ${(props) => props.theme.colors.main.green};
    color: ${(props) => props.theme.colors.main.white};
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }
`;

export const NotificationButton = styled(Badge)`
  &.MuiBadge-root {
    width: 57.5px;
    margin-right: 5px;
  }

  & .MuiBadge-badge {
    background-color: ${(props) => props.theme.colors.main.green};
    color: ${(props) => props.theme.colors.main.white};
    font-family: ${(props) => props.theme.fonts.mainFont};
    top: 10px;
    right: 13px;
    border-radius: 4px;
    min-width: 28.5px;
  }

  @media screen and (min-width: 1280px) {
    &.MuiBadge-root {
      width: 57.5px;
      margin: 0 16.5px 0 40px;
    }
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

export const MobileInputWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 64px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.main.white};
  z-index: 10;
`;

export const MobileOverlay = styled.div`
  position: fixed;
  top: 116px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.main.white};
  opacity: .8;
  z-index: 5;
`;
