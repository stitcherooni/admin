import React from 'react';
import { SelectProps } from '@mui/material/Select/Select';
import { StyledSelect, Option } from './Select.styled';
import ArrowDownDropdown from '../../../assets/icons/arrow-down-dropdown';
import { theme as Theme } from '../../../styles/defaultTheme';

interface OptionType {
  value: string | number;
  label: string | number;
}

interface CustomSelectProps extends SelectProps {
  options: OptionType[];
  menuWidth?: number;
}

const Select = (props: CustomSelectProps) => (
  <StyledSelect
    name={props.name}
    value={props.value}
    displayEmpty
    renderValue={props.value !== '' ? undefined : () => <p className="placeholder">{props.placeholder}</p>}
    onChange={props.onChange}
    MenuProps={{
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      transformOrigin: {
        vertical: 'top',
        horizontal: 'left',
      },
      PaperProps: {
        sx: {
          '&.MuiPaper-root': {
            filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
            border: `1px solid ${Theme.colors.gray.gray1}`,
            borderRadius: '8px',
          },
          width: `${props.menuWidth}px`,
        },
      },
    }}
    IconComponent={ArrowDownDropdown}
  >
    {props.options.map((option) => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
  </StyledSelect>
);

Select.defaultProps = {
  menuWidth: 300,
  placeholder: 'Placeholder',
};

export default Select;
