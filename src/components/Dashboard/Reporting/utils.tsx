import React from 'react';

import ReportingCustomers from './ReportingCustomers/ReportingCustomers';
// import ReportingMiWizard from './ReportingMiWizard/ReportingMiWizard';
import ReportingSales from './ReportingSales/ReportingSales';
import ReportingOrders from './ReportingOrders/ReportingOrders';
import ReportingTreasurerByEvent from './ReportingTreasurerByEvent/ReportingTreasurerByEvent';
import ReportingTreasurerByDate from './ReportingTreasurerByDate/ReportingTreasurerByDate';
import ReportingTickets from './ReportingTickets/ReportingTickets';
import ReportingVolunteers from './ReportingVolunteers/ReportingVolunteers';
import ReportingBooking from './ReportingBooking/ReportingBooking';
import ReportingChildBooking from './ReportingChildBooking/ReportingChildBooking';
import ReportingBanked from './ReportingBanked/ReportingBanked';
import ReportingEmailTracker from './ReportingEmailTracker/ReportingEmailTracker';
import ReportingProductQuestions from './ReportingProductQuestions/ReportingProductQuestions';
import ReportingInvoices from './ReportingInvoices/ReportingInvoices';
import { ReportTypes } from './tabs';

export const getReportComponent = (type: string) => {
  switch (type) {
    case ReportTypes.CUSTOMERS: return <ReportingCustomers />;
    case ReportTypes.SALES: return <ReportingSales />;
    case ReportTypes.ORDERS: return <ReportingOrders />;
    case ReportTypes.TREASURER_BY_EVENT: return <ReportingTreasurerByEvent />;
    case ReportTypes.TREASURER_BY_DATE: return <ReportingTreasurerByDate />;
    case ReportTypes.TICKETS: return <ReportingTickets />;
    case ReportTypes.VOLUNTEERS: return <ReportingVolunteers />;
    case ReportTypes.BOOKINGS: return <ReportingBooking />;
    case ReportTypes.CHILD_BOOKINGS: return <ReportingChildBooking />;
    case ReportTypes.BANKED: return <ReportingBanked />;
    case ReportTypes.EMAIL_TRACKER: return <ReportingEmailTracker />;
    case ReportTypes.PRODUCT_QUESTIONS: return <ReportingProductQuestions />;
    case ReportTypes.INVOICES: return <ReportingInvoices />;
    default: return null;
  }
};
