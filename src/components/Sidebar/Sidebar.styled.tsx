import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (min-width: 1280px) {
    flex-direction: column;
  }
`;

export const Item = styled.div<{ content: string }>`
  min-width: 72px;
  display: flex;
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${(props) => props.theme.colors.gray.gray5};
  border-top: 1px solid ${(props) => props.theme.colors.gray.gray5};
  border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
  position: relative;

  & svg path {
    transition: all 0.5s;
  }

  &.selected {
    background-color: ${(props) => props.theme.colors.main.green};
    border-color: ${(props) => props.theme.colors.main.green};
    box-shadow: 2px 2px 24px rgba(122, 81, 145, 0.32);

    & svg path {
      fill: ${(props) => props.theme.colors.main.white};
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.main.green};
    border-color: ${(props) => props.theme.colors.main.green};
    box-shadow: 2px 2px 24px rgba(122, 81, 145, 0.32);

    &.settings {
      border-color: ${(props) => props.theme.colors.main.green};
    }

    & svg path {
      fill: ${(props) => props.theme.colors.main.white};
      transition: all 0.5s;
    }
  }

  @media screen and (min-width: 1280px) {
    width: 100%;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray.gray5};
    background-color: ${(props) => props.theme.colors.main.white};

    &.settings {
      border-top: 1px solid ${(props) => props.theme.colors.gray.gray5};
      position: fixed;
      left: 0;
      bottom: 0;
      width: 72px;
    }

    &::after {
      content: '${(props) => props.content}';
      position: fixed;
      left: 72px;
      z-index: 10;
      background-color: ${(props) => props.theme.colors.main.green};
      min-width: 270px;
      color: ${(props) => props.theme.colors.main.white};
      font-family: ${(props) => props.theme.fonts.mainFont};
      font-size: 20px;
      line-height: 30px;
      display: none;
      align-items: center;
      border-radius: 0px 8px 8px 0px;
    }

    &.dashboard::after {
      height: 57px;
    }

    &.events::after, &.listings::after, &.quick-link::after {
      height: 59px;
    }

    &.admin::after, &.reporting::after {
      height: 55px;
    }

    &.help::after {
      height: 60px;
    }

    &.settings::after {
      height: 58px;
    }

    &:hover {
      &::after {
        display: flex;
      }
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  display: flex;
  overflow: scroll;
  scrollbar-color: transparent;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  @media screen and (min-width: 1280px) {
    height: 100%;
    width: 72px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
  }
`;

export const RootContainer = styled.div`
  overflow: hidden;

  @media screen and (min-width: 1280px) {
    position: fixed;
    top: 72px;
    z-index: 10;
    height: calc(100% - 120px);
  }
`;
