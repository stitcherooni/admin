import React, { MouseEventHandler } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Wrapper, Form, WarningAlert,
} from './BookingRandomModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';

interface BookingRandomModalProps {
  handleClose: () => void;
}

const BookingRandomModal = ({ handleClose }: BookingRandomModalProps) => {
  const formik = useFormik({
    initialValues: {
      random: '',
    },
    validationSchema: Yup.object().shape({
      random: Yup.number().min(1, 'Value should be more that 1').required('Value should be more that 1'),
    }),
    onSubmit: (values) => {
      alert('add error handler');
    },
  });

  return (
    <Wrapper>
      <h3>Select random bookings</h3>
      {formik.errors.random ? (
        <WarningAlert type="error">
          {formik.errors.random}
        </WarningAlert>
      ) : null}
      <Form>
        <div className="form-row">
          <Label
            text="Number of random bookings"
            content={{
              title: '',
              text: '',
            }}
            inputId="random"
          />
          <Input type="number" value={formik.values.random} name="random" id="random" onChange={formik.handleChange} />
        </div>
        <div className="buttons-wrapper">
          <GreenButton
            onClick={formik.handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>}
          >
            Select random bookings
          </GreenButton>
          <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
        </div>
      </Form>
    </Wrapper>
  );
};

export default BookingRandomModal;
