import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { CustomDatePicker, DatePickerStyles } from './DatePicker.styled';

const DatePicker = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        dayOfWeekFormatter={(day) => `${day}`}
        showDaysOutsideCurrentMonth
        slotProps={{
          textField: {
            inputProps: {},
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <InsertInvitationIcon />
                </InputAdornment>
              ),
            },
          },
          toolbar: { hidden: true },
          layout: DatePickerStyles,
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
