import styled from 'styled-components';

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

export const ButtonsWrapper = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 16px;

  & .MuiButtonBase-root.MuiButton-root {
    height: 40px;

    &.MuiButton-sizeSmall {
      height: 40px;
      padding: 4px 20px;
      font-size: 14px;
    }
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    /* margin-bottom: 24px; */
    margin-bottom: 64px;

    & .MuiButtonBase-root.MuiButton-root {
      &.MuiButton-sizeSmall {
        padding: 4px 24px;
      }
    }
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
    padding: 5px 0 0 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
    }
  }
`;
