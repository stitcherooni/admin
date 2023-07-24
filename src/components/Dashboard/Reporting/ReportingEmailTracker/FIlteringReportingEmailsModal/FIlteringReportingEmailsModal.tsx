import React from 'react';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { Wrapper, Form, Divider, Row } from './FilteringReportingEmailsModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import ZoomIconSmall from '../../../../../assets/icons/zoom-icon-small';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import DatePicker from '../../../../shared/Datepicker/DatePicker';

const FilteringReportingEmailsModal = () => (
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
        <Label text="Message ID" inputId="message-id" content={{} as any} />
        <Input name="message-id" id="message-id" placeholder="Message ID" />
      </Row>
      <Row>
        <Label text="Email Start Date" inputId="start-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row>
        <Label text="Email End Date" inputId="end-date" content={{} as any} />
        <DatePicker />
      </Row>
      <Row>
        <Label text="Customer ID" inputId="customer-id" content={{} as any} />
        <Input placeholder="Customer ID" />
      </Row>
      <Row>
        <Label text="Customer First Name" inputId="first-name" content={{} as any} />
        <Input placeholder="Customer First Name" />
      </Row>
      <Row>
        <Label text="Customer Last Name" inputId="last-name" content={{} as any} />
        <Input placeholder="Customer Last Name" />
      </Row>
      <Row>
        <Label text="Customer Email" inputId="email" content={{} as any} />
        <Input placeholder="Customer Email" />
      </Row>
      <Row className="last">
        <Label text="Sent by" inputId="sent-by" content={{} as any} />
        <Input placeholder="Sent by" />
      </Row>
      <div className="button-wrapper">
        <SecondaryButton>Reset</SecondaryButton>
        <GreenButton>Apply Filters</GreenButton>
      </div>
    </Form>
  </Wrapper>
);

export default FilteringReportingEmailsModal;
