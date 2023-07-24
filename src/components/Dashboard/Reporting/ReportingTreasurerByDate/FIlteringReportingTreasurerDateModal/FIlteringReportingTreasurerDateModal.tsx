import React from 'react';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { Wrapper, Form, Divider, Row } from './FilteringReportingTreasurerDateModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import ZoomIconSmall from '../../../../../assets/icons/zoom-icon-small';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import DatePicker from '../../../../shared/Datepicker/DatePicker';
import Select from '../../../../shared/Select/Select';

const FilteringReportingTreasurerDateModal = () => (
  <Wrapper>
    <p className="title">Search & Advanced Filtering</p>
    <Form className="search-form">
      <h4>Search</h4>
      <Input
        name="search"
        placeholder="Search by name, customer ID, email, postcode etc"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ZoomIconSmall />
            </InputAdornment>
          ),
        }}
      />
      <div className="button-wrapper">
        <GreenButton>Search</GreenButton>
      </div>
    </Form>
    <Divider />
    <Form className="filtering">
      <h4>Advanced Filtering</h4>
      <Row>
        <Label text="Order Start Date" inputId="start-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row>
        <Label text="Order End Date" inputId="end-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row className="last">
        <Label text="Payment Method" inputId="payment-method" content={{} as any} />
        <Select options={[]} id="payment-method" />
      </Row>
      <div className="button-wrapper">
        <SecondaryButton>Reset</SecondaryButton>
        <GreenButton>Apply Filters</GreenButton>
      </div>
    </Form>
  </Wrapper>
);

export default FilteringReportingTreasurerDateModal;
