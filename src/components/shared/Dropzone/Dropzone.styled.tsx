import styled from 'styled-components';
import { FormHelperText } from '@mui/material';

export const DropzoneArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 129px;
  background-color: rgba(233, 0, 132, 0.08);
  border: 1px dashed ${(props) => props.theme.colors.main.pink};
  border-radius: 8px;
  padding: 30px;

  @media screen and (min-width: 1280px) {
    width: 342px;
  }
`;

export const TextWrapper = styled.div`
  margin-top: 9px;

  & p {
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 12px;
    height: 16px;
    color: ${(props) => props.theme.colors.main.black};
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
