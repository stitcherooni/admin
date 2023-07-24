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

export const getReportComponent = (type: string) => {
  switch (type) {
    case 'customers': return <ReportingCustomers />;
    case 'sales': return <ReportingSales />;
    case 'orders': return <ReportingOrders />;
    case 'event-treasurer': return <ReportingTreasurerByEvent />;
    case 'date-treasurer': return <ReportingTreasurerByDate />;
    case 'tickets': return <ReportingTickets />;
    case 'volunteers': return <ReportingVolunteers />;
    case 'booking': return <ReportingBooking />;
    case 'child-booking': return <ReportingChildBooking />;
    case 'banked': return <ReportingBanked />;
    case 'email-tracker': return <ReportingEmailTracker />;
    case 'product-questions': return <ReportingProductQuestions />;
    case 'invoices': return <ReportingInvoices />;
    default: return null;
  }
};
