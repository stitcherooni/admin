import styled from 'styled-components';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import StepLabel from '@mui/material/StepLabel';

export const Wrapper = styled.div`

`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  & p {
    font-size: 14px;
    font-family: ${(props) => props.theme.fonts.mainFont};
  }

  & svg {
    font-size: 16px;
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const ArrowIcon = styled(ArrowForwardOutlinedIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.blue};
  }
`;

export const CheckedIcon = styled(CheckCircleOutlinedIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.green};
  }
`;

export const EmailIcon = styled(EmailOutlinedIcon)`
  &.MuiSvgIcon-root {
    fill: ${(props) => props.theme.colors.main.blue};
  }
`;

export const StepTitle = styled(StepLabel)`
  & .MuiStepLabel-label {
    font-family: ${(props) => props.theme.fonts.mainFont};
  }
`;
