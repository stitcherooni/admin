import TextareaAutosize from '@mui/material/TextareaAutosize';
import styled from 'styled-components';

export const StyledTextarea = styled(TextareaAutosize)`
  width: 100%;
  font-family: ${(props) => props.theme.fonts.mainFont};
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px 24px;
  border-radius: 12px 12px 0 12px;
  color: ${(props) => props.theme.colors.gray.gray3};
  background-color: ${(props) => props.theme.colors.main.white};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colors.main.black};

  &:hover {
    border-color: ${(props) => props.theme.colors.main.black};
  }

  &:focus {
    border: 1px solid #1976d2;
    box-shadow: 0 0 0 1px #1976d2;
  }

  &:focus-visible {
    outline: 0;
  }
`;
