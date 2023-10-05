import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import InputAdornment from '@mui/material/InputAdornment';
import { CustomDatePicker, DatePickerStyles } from './DatePicker.styled';

interface DatePickerProps {
  onChange: (date: Dayjs) => void;
  defaultDate?: Dayjs;
}

const DatePicker = (props: DatePickerProps) => {
  const [value, setValue] = React.useState<Dayjs | null>(!props.defaultDate
    ? null : props.defaultDate);
  const handleChange = (date: Dayjs) => {
    if (props.onChange) {
      setValue(value);
      props.onChange(dayjs(date));
    } else {
      setValue(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <CustomDatePicker
        value={value}
        onChange={(newValue) => handleChange(newValue as Dayjs)}
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
