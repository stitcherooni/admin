import styled from 'styled-components';
import { Input } from '../../../../shared/Input/Input.styled';

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
    align-items: center;
    justify-content: flex-end;
    padding-right: 0;

    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
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
