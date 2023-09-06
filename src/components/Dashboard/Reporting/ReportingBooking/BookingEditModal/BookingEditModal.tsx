import React from 'react';
import { useSelector } from 'react-redux';
import {
  StyledCheckbox, Wrapper, Form, WarningAlert,
} from './BookingEditModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import Select from '../../../../shared/Select/Select';
import { RootState } from '../../../../../redux/store';
import { EditBookingData } from '../../../../../types/reporting/bookings';
import { useFormik } from 'formik';

const getFieldByType = (type: string, formik: any) => {
  switch (type) {
    case 'text': return <Input />;
    default: return null;
  }
}

const BookingEditModal = () => {
  const data = useSelector((state: RootState) => state.reporting.bookings.editBookingData);
  const { selectedBooking, products, questions } = data;
  const { product } = selectedBooking;
  console.log(questions);

  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {

    },
  });

  return (
    <Wrapper>
      <h3>Please confirm changes to the booking</h3>
      {selectedBooking.quantity > 0 ? (
        <WarningAlert type="error">
          <p>
            You can update the product but this will change for all
            <strong>{` ${selectedBooking.quantity} ` }</strong>
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
        {product.bookable || !product.productHideClass ? (
          <div className="form-row">
            <Label
              text="Class"
              content={{
                title: '',
                text: '',
              }}
              inputId=""
            />
            <Select options={[]} />
          </div>
        ) : null}
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
};

export default BookingEditModal;
