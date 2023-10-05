import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import Label from '../../../../shared/Label/Label';
import DatePicker from '../../../../shared/Datepicker/DatePicker';
import { GreenButton, SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import { OverlayWrapper } from './DeleteCustomerModal.styled';
import { AppDispatch } from '../../../../../redux/store';
import { removeCustomer } from '../../../../../redux/actions/reporting.actions';

interface DeleteCustomerModalProps {
  firstName: string;
  lastName: string;
  userId: number;
  cancel: () => void;
}

const DeleteCustomerModal = (props: DeleteCustomerModalProps) => {
  const [date, setDate] = useState(dayjs().format());
  const dispatch = useDispatch<AppDispatch>();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDate = dayjs(date).format('YYYY-MM-DDTHH:mm:ss');

    // Get the current milliseconds and format it as three-digit string
    const milliseconds = String(dayjs().millisecond()).padStart(3, '0');

    // Concatenate the milliseconds and 'Z' character
    const formattedWithMilliseconds = `${formattedDate}.${milliseconds}Z`;

    dispatch(removeCustomer({
      userId: props.userId,
      erasureDate: formattedWithMilliseconds,
    }));
    props.cancel();
  };

  return (
    <OverlayWrapper>
      <h3>Please confirm</h3>
      <p>
        Are you sure you want to delete
        <strong>{` ${props.firstName} ${props.lastName} (${props.userId})`}</strong>
        ?
      </p>
      <p>
        Under
        <a href="https://www.privacy-regulation.eu/en/17.htm">Article 17 of the GDPR</a>
        <strong>{` ${props.firstName} ${props.lastName} (${props.userId}) `}</strong>
        has the right to have their personal data erased. This is also known as the "right to be forgotten". The right is not absolute and only applies in certain circumstances. If they wish, we will delete or remove personal data where there is no good reason for us continuing to process it.
      </p>
      <strong>Right to be forgotten timeline</strong>
      <ul>
        <li>
          <strong>Date specified: </strong>
          All
          <strong> personal </strong>
          data in our database will be deleted if it is no longer necessary to keep it. Only the customer email will be retained and pseudonymised. Their personal data includes:
          <ul>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Address 1</li>
            <li>Address 2</li>
            <li>Town</li>
            <li>County</li>
            <li>Postcode</li>
            <li>Telephone</li>
            <li>Mobile</li>
            <li>Email</li>
            <li>IP addresses</li>
            <li>Class Lists</li>
            <li>Event booking information</li>
            <li>Emails</li>
            <li>Photo</li>
          </ul>
          <li>
            <strong>+24 hours:</strong>
            {' '}
            Any Sub-Processors storing this personal data will be notified
          </li>
          <li>
            <strong>+8 days:</strong>
            {' '}
            All backups of data will be deleted
          </li>
        </li>
      </ul>
      <form>
        <Label
          text="Date of Erasure"
          content={{
            title: '',
            text: '',
          }}
          inputId=""
        />
        <DatePicker defaultDate={dayjs()} onChange={setDate} />
        <div className="buttons-wrapper">
          <GreenButton type="submit" onClick={handleSubmit}>Remove</GreenButton>
          <SecondaryButton onClick={props.cancel}>Cancel</SecondaryButton>
        </div>
      </form>
    </OverlayWrapper>
  );
};

export default DeleteCustomerModal;
