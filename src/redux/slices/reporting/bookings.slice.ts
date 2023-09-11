import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getBookingFilters,
  getBookingStat,
  getRandomBookingStat,
  getTestBookingStat,
  sortBookingStat,
} from '../../actions/reporting.actions';
import { BookingsStatProps, BookingStatFilters } from '../../../types/reporting/bookings';
import { ReportingBookingsFilters } from '../../../components/Dashboard/Reporting/ReportingBooking/ReportingBookingFilters';

export interface BookingInitialState extends BookingsStatProps {
  status: string;
  error?: string | null;
  selectedFilters: ReportingBookingsFilters;
}

const initialState: BookingInitialState = {
  status: 'loading',
  filters: null,
  data: [],
  testData: [],
  totalProductQuantity: 0,
  error: null,
  selectedFilters: {
    event: {
      value: '',
      label: '',
      year: '',
    },
    product: '',
    groupBy: '',
  },
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    resetSelectedFilters: (state) => {
      state.selectedFilters = initialState.selectedFilters;
    },
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
  },
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
          error: null,
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
        error: null,
      }))
      .addCase(sortBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getTestBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getTestBookingStat.fulfilled, (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        testData: action.payload.data,
        error: null,
      }))
      .addCase(getTestBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getRandomBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getRandomBookingStat.fulfilled, (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        error: null,
      }))
      .addCase(getRandomBookingStat.rejected, (state, action) => ({
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
        error: null,
      }))
      .addCase(getBookingFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export const { resetSelectedFilters, updateSelectedFilters } = bookingsSlice.actions;

export default bookingsSlice.reducer;
