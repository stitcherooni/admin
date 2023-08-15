import React from 'react';
import {
  StyledCheckbox, Wrapper, Form, WarningAlert,
} from './BookingEditModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import Select from '../../../../shared/Select/Select';

interface BookingEditModalProps {
  bookedBy?: boolean;
}

const BookingEditModal = (props: BookingEditModalProps) => (
  <Wrapper>
    <h3>Please confirm changes to the booking</h3>
    {props.bookedBy ? (
      <WarningAlert type="error">
        <p>
          You can update the product but this will change for all
          <strong>15</strong>
          {' '}
          products purchased
        </p>
      </WarningAlert>
    ) : null}
    <Form>
      <div className="form-row">
        <Label
          text="Product Name"
          content={{
            title: '',
            text: '',
          }}
          inputId=""
        />
        <Select options={[]} />
      </div>
      <div className="form-row">
        <Label
          text="Booking Name"
          content={{
            title: '',
            text: '',
          }}
          inputId=""
        />
        <Input />
      </div>
      <div className="form-row">
        <Label
          text="{Question}"
          content={{
            title: '',
            text: '',
          }}
          inputId=""
        />
        <p className="form-message">Note: this answer is encrypted in the database</p>
        <Select options={[]} />
      </div>
      <div className="form-row">
        <Label
          text="Terms"
          content={{
            title: '',
            text: '',
          }}
          inputId=""
        />
        <p className="form-message">Note: this answer is encrypted in the database</p>
        <StyledCheckbox />
      </div>
      <div className="buttons-wrapper">
        <GreenButton>Update</GreenButton>
        <SecondaryButton>Cancel</SecondaryButton>
      </div>
    </Form>
  </Wrapper>
);

export default BookingEditModal;
