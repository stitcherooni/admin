import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getBookingFilters,
  getBookingStat,
  sortBookingStat,
} from '../../actions/reporting.actions';
import { BookingsStatProps, BookingStatFilters } from '../../../types/reporting/bookings';

export interface BookingInitialState extends BookingsStatProps {
  status: string;
}

const initialState: BookingInitialState = {
  status: 'loading',
  filters: null,
  data: [],
  totalProductQuantity: 0,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getBookingStat.fulfilled,
        (state, action: PayloadAction<Omit<BookingInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalProductQuantity: action.payload.totalProductQuantity,
        })
      )
      .addCase(getBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(sortBookingStat.fulfilled, (state, action: PayloadAction<Omit<BookingInitialState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        totalProductQuantity: action.payload.totalProductQuantity,
      }))
      .addCase(sortBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getBookingFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getBookingFilters.fulfilled, (state, action: PayloadAction<BookingStatFilters>) => ({
        ...state,
        status: 'succeeded',
        filters: action.payload,
      }))
      .addCase(getBookingFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default bookingsSlice.reducer;
