import React, { MouseEventHandler } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Wrapper, Form,
} from './BookingRandomModal.styled';
import { Input } from '../../../../shared/Input/Input.styled';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import Label from '../../../../shared/Label/Label';
import Alert from '../../../../shared/Alert/Alert';

interface BookingRandomModalProps {
  handleClose: () => void;
}

const BookingRandomModal = ({ handleClose }: BookingRandomModalProps) => {
  const formik = useFormik({
    initialValues: {
      random: 0,
    },
    validationSchema: Yup.object().shape({
      random: Yup.number().min(1, 'Value should be greater than 1'),
    }),
    onSubmit: (values) => {

    },
  });

  return (
    <Wrapper>
      <h3>Select random bookings</h3>
      {formik.errors.random ? (
        <Alert type="error">
          {formik.errors.random}
        </Alert>
      ) : null}
      <Form>
        <div className="form-row">
          <Label
            text="Number of random bookings"
            content={{
              title: '',
              text: '',
            }}
            inputId="random-input"
          />
          <Input type="number" name="random" id="random-input" value={formik.values.random} onChange={formik.handleChange} />
        </div>
        <div className="buttons-wrapper">
          <GreenButton
            onClick={formik.handleSubmit as unknown as MouseEventHandler<HTMLButtonElement>}
          >
            Update
          </GreenButton>
          <SecondaryButton onClick={handleClose}>Close</SecondaryButton>
        </div>
      </Form>
    </Wrapper>
  );
};

export default BookingRandomModal;
