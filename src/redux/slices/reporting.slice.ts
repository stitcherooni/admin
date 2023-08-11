import { combineReducers } from '@reduxjs/toolkit';
import bankedReducer from './reporting/banked.slice';
import bookingsReducer from './reporting/bookings.slice';
import childBookingsReducer from './reporting/childBookings.slice';
import customersReducer from './reporting/customers.slice';
import emailTrackerReducer from './reporting/emailTracker.slice';
import invoicesReducer from './reporting/invoices.slice';
import ordersReducer from './reporting/orders.slice';
import productQuestionsReducer from './reporting/productQuestions.slice';
import salesReducer from './reporting/sales.slice';
import ticketsReducer from './reporting/tickets.slice';
import treasurerByEventReducer from './reporting/treasurerByEvent.slice';
import treasurerByDateReducer from './reporting/treasurerByDate.slice';
import volunteersReducer from './reporting/volunteers.slice';

const reportingReducer = combineReducers({
  banked: bankedReducer,
  bookings: bookingsReducer,
  childBookings: childBookingsReducer,
  customers: customersReducer,
  emailTracker: emailTrackerReducer,
  invoices: invoicesReducer,
  orders: ordersReducer,
  productQuestions: productQuestionsReducer,
  sales: salesReducer,
  tickets: ticketsReducer,
  treasurerByEvent: treasurerByEventReducer,
  treasurerByDate: treasurerByDateReducer,
  volunteers: volunteersReducer,
});

export default reportingReducer;
