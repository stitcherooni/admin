import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { Wrapper, Form, Divider, Row } from './FilteringReportingCustomersModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import ZoomIconSmall from '../../../../../assets/icons/zoom-icon-small';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import DatePicker from '../../../../shared/Datepicker/DatePicker';
import Select from '../../../../shared/Select/Select';

const FilteringReportingCustomersModal = () => (
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
        <Label
          text="Start Reg Date"
          inputId="start-date"
          content={{
            title: '',
            text: '',
          }}
        />
        <DatePicker />
      </Row>
      <Row>
        <Label
          text="End Reg Date"
          inputId="end-date"
          content={{
            title: '',
            text: '',
          }}
        />
        <DatePicker />
      </Row>
      <Row>
        <Label
          text="Customer ID"
          inputId="customer-id"
          content={{
            title: '',
            text: '',
          }}
        />
        <Input placeholder="Customer ID" />
      </Row>
      <Row>
        <Label
          text="First Name"
          inputId="first-name"
          content={{
            title: '',
            text: '',
          }}
        />
        <Input placeholder="First Name" />
      </Row>
      <Row>
        <Label
          text="Last Name"
          inputId="last-name"
          content={{
            title: '',
            text: '',
          }}
        />
        <Input placeholder="Last Name" />
      </Row>
      <Row>
        <Label
          text="Email"
          inputId="email"
          content={{
            title: '',
            text: '',
          }}
        />
        <Input placeholder="Email" />
      </Row>
      <Row>
        <Label
          text="Postcode"
          inputId="post-code"
          content={{
            title: '',
            text: '',
          }}
        />
        <Input name="post-code" id="post-code" placeholder="Postcode" />
      </Row>
      <Row>
        <Label
          text="Customer Approved"
          inputId="customer-approved"
          content={{
            title: '',
            text: '',
          }}
        />
        <Select options={[]} />
      </Row>
      <Row>
        <Label
          text="Customer Newsletter"
          inputId="customer-newsletter"
          content={{
            title: '',
            text: '',
          }}
        />
        <Select options={[]} />
      </Row>
      <Row>
        <Label
          text="Customer Marketing Emails"
          inputId="customer-marketing"
          content={{
            title: '',
            text: '',
          }}
        />
        <Select options={[]} id="customer-marketing" />
      </Row>
      <Row>
        <Label
          text="Registered on class lists"
          inputId="customer-classlist"
          content={{
            title: '',
            text: '',
          }}
        />
        <Select options={[]} id="customer-classlist" />
      </Row>
      <Row className="last">
        <Label
          text="Guest Customer"
          inputId="guest-customer"
          content={{
            title: '',
            text: '',
          }}
        />
        <Select options={[]} id="guest-customer" />
      </Row>
      <div className="button-wrapper">
        <SecondaryButton>Reset</SecondaryButton>
        <GreenButton>Apply Filters</GreenButton>
      </div>
    </Form>
  </Wrapper>
);

export default FilteringReportingCustomersModal;
