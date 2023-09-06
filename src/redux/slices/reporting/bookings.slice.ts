import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getBookingFilters,
  getBookingStat,
  getRandomBookingStat,
  getTestBookingStat,
  sortBookingStat,
} from '../../actions/reporting.actions';
import { BookingsStatProps, BookingStatFilters } from '../../../types/reporting/bookings';

interface ReportingInitialState extends BookingsStatProps {
  status: string;
  error?: string | null;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  filters: null,
  data: [],
  testData: [],
  randomData: [],
  totalProductQuantity: 0,
  error: null,
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
        (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
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
      .addCase(sortBookingStat.fulfilled, (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
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
        testData: action.payload.testData,
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
        randomData: action.payload.randomData,
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

export default bookingsSlice.reducer;
