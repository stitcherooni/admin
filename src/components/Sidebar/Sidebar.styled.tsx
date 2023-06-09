import styled from 'styled-components';

export const List = styled.div`
  display: flex;
  flex-direction: row;

  @media screen and (min-width: 1280px) {
    flex-direction: column;
  }
`;

export const Item = styled.div<{ content: string; y?: number; height?: number }>`
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

    &.settings {
      border-top: 1px solid ${(props) => props.theme.colors.gray.gray5};
    }

    &:hover {
      &::after {
        content: '${(props) => props.content}';
        position: fixed;
        top: ${(props) => props.y}px;
        right: 0;
        left: 72px;
        z-index: 5;
        background-color: ${(props) => props.theme.colors.main.green};
        height: ${(props) => props.height}px;
        max-width: 270px;
        color: ${(props) => props.theme.colors.main.white};
        font-family: ${(props) => props.theme.fonts.mainFont};
        font-size: 20px;
        line-height: 30px;
        display: flex;
        align-items: center;
        border-radius: 0px 8px 8px 0px;
      }
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.main.white};
  display: flex;
  overflow: scroll;

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
`;
