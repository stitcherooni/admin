import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styled from 'styled-components';
import { theme } from '../../../styles/defaultTheme';

export const CustomDatePicker = styled(DatePicker)`
  width: 100%;

  & .MuiInputBase-root.MuiInputBase-formControl {
    height: 48px;
    font-family: ${(props) => props.theme.fonts.mainFont};
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.0041em;
    color: ${(props) => props.theme.colors.gray.gray3};
    background-color: ${(props) => props.theme.colors.main.white};
    padding: 13px 24px 13px 10px;
    border-radius: 8px;
  }
`;

export const DatePickerStyles = {
  sx: {
    '& .MuiPickersCalendarHeader-root': {
      position: 'relative',
      padding: '0 24px',
    },
    '& .MuiPickersCalendarHeader-labelContainer': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: theme.fonts.mainFont,
      '& button': {
        display: 'none',
      },
    },
    '& .MuiPickersArrowSwitcher-root': {
      width: '100%',
      justifyContent: 'space-between',
    },
    '& .MuiPickersYear-yearButton': {
      fontFamily: theme.fonts.mainFont,
    },
    '& .MuiButtonBase-root.MuiIconButton-root.MuiPickersArrowSwitcher-button': {
      backgroundColor: theme.colors.gray.gray6,
      borderRadius: '8px',
    },
    '& .MuiTypography-root.MuiDayCalendar-weekDayLabel': {
      fontFamily: theme.fonts.mainFont,
      fontSize: '14px',
      color: theme.colors.main.black,
    },
    '& .MuiButtonBase-root.MuiPickersDay-root': {
      fontFamily: theme.fonts.mainFont,
      fontSize: '14px',
      '&:hover': {
        backgroundColor: theme.colors.main.lightGreen,
        color: theme.colors.main.green,
        borderRadius: '8px',
      },
      '&.Mui-selected': {
        backgroundColor: theme.colors.main.green,
        color: theme.colors.main.white,
        borderRadius: '8px',
      },
    },
  },
};
