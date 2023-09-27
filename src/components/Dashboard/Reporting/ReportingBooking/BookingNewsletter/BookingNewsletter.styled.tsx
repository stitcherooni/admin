import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  @media screen and (min-width: 1280px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 0;
  }
`;

export const Form = styled.form`
  width: 100%;
  order: 2;
  margin-top: 32px;

  @media screen and (min-width: 1280px) {
    width: 65%;
    order: initial;
    margin-top: 0;
  }
`;

export const Title = styled.h2`
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 16px;
`;

export const Row = styled.div`
  margin-bottom: 16px;

  &.checkbox {
    display: flex;
  }

  & .MuiButtonBase-root.MuiButton-root {
    width: 100%;
    margin-bottom: 16px;
  }

  &.last {
    margin-bottom: 32px;
  }

  @media screen and (min-width: 1280px) {
    & .MuiButtonBase-root.MuiButton-root {
      width: initial;
      margin-bottom: 0;
    }

    & .MuiButtonBase-root.MuiButton-root:not(:last-child) {
      margin-right: 16px;
    }

    &.last {
      margin-bottom: 64px;
    }
  }
`;

export const Divider = styled.hr`
  background-color: ${(props) => props.theme.colors.main.purple};
  margin: 16px 0;
`;

export const FilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.mainFont};

  & .file {
    margin-bottom: 16px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: row;

    & .file {
      margin-bottom: 0;
    }

    & .file:first-of-type {
      margin-right: 40px; 
    }
  
    & p.file-name {
      margin-top: 16px;
      font-size: 14px;
    }
  }
`;

export const StyledError = styled(FormHelperText)`
  &.MuiFormHelperText-root {
    color: ${(props) => props.theme.colors.main.red};
    margin: 4px 0 0 0;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 22px;
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  &.MuiButtonBase-root.MuiCheckbox-root {
    margin: 0 auto;
    padding: 4px 8px;
    color: ${(props) => props.theme.colors.main.purple};

    &.Mui-checked {
      color: ${(props) => props.theme.colors.main.purple};
    }
  }
`;

export const AlertWrapper = styled.div`
  padding: 0 16px 16px 16px;

  @media screen and (min-width: 1280px) {
    padding: 0;
  }
`;
