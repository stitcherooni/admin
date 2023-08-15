import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { Wrapper, Form, Divider, Row } from './FilteringReportingOrdersModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import ZoomIconSmall from '../../../../../assets/icons/zoom-icon-small';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import Select from '../../../../shared/Select/Select';
import DatePicker from '../../../../shared/Datepicker/DatePicker';

const FilteringReportingOrdersModal = () => (
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
        <Label text="Order ID" inputId="order-id" content={{} as any} />
        <Input name="order-id" id="order-id" placeholder="Order ID" />
      </Row>
      <Row>
        <Label text="Payment Method" inputId="payment-method" content={{} as any} />
        <Select options={[]} id="payment-method" />
      </Row>
      <Row>
        <Label text="PayPal Transaction ID" inputId="paypal-id" content={{} as any} />
        <Input placeholder="PayPal Transaction ID" />
      </Row>
      <Row>
        <Label text="Order Start Date" inputId="start-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row>
        <Label text="Order End Date" inputId="end-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row>
        <Label text="Customer ID" inputId="customer-id" content={{} as any} />
        <Input placeholder="Customer ID" />
      </Row>
      <Row>
        <Label text="First Name" inputId="first-name" content={{} as any} />
        <Input placeholder="First Name" />
      </Row>
      <Row>
        <Label text="Last Name" inputId="last-name" content={{} as any} />
        <Input placeholder="Last Name" />
      </Row>
      <Row>
        <Label text="Email" inputId="email" content={{} as any} />
        <Input placeholder="Email" />
      </Row>
      <Row className="last">
        <Label text="Type" inputId="type" content={{} as any} />
        <Select options={[]} />
      </Row>
      <div className="button-wrapper">
        <SecondaryButton>Reset</SecondaryButton>
        <GreenButton>Apply Filters</GreenButton>
      </div>
    </Form>
  </Wrapper>
);

export default FilteringReportingOrdersModal;
