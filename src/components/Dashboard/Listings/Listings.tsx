import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import EmailUserForm from './ListingsForm/EmailUserForm/EmailUserForm';
import BookingNewsletter from '../Reporting/ReportingBooking/BookingNewsletter/BookingNewsletter';

const Listings = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const getEmailForm = (type: string) => {
    switch (type) {
      case 'customer-email':
        return <EmailUserForm />;
      case 'booking-newsletter':
        return <BookingNewsletter />;
      default: return null;
    }
  };

  const Component = useMemo(() => getEmailForm(searchParams.get('type')), [searchParams]);

  return <div>
   {Component}
  </div>
}

export default Listings;
