import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const Input = styled(TextField)`
  width: 100%;
  z-index: 10;

  & .MuiInputBase-root.MuiInputBase-formControl {
    height: 48px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.0041em;
    color: ${(props) => props.theme.colors.gray.gray3};
    background-color: ${(props) => props.theme.colors.main.white};
    padding: 13px 10px;
    border-radius: 8px;
  }

  & .MuiInputBase-root.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
    border: 2px solid ${(props) => props.theme.colors.main.red};
  }

  & .MuiFormHelperText-contained {
    margin-left: 0;
  }

  & .MuiFormHelperText-root.Mui-error.MuiFormHelperText-contained {
    color: ${(props) => props.theme.colors.main.red};
    margin: 4px 0 0 0;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 22px;
  }

  /* & .MuiInputBase-input.MuiOutlinedInput-input::-webkit-input-placeholder {
    color: red;
    
  } */

  & .MuiInputBase-input.MuiOutlinedInput-input::-moz-placeholder {
    /* Firefox 19+ */
    
  }
`;
