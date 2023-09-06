import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getBookingFilters,
  getBookingStat,
  getBookingsEditData,
  sortBookingStat,
} from '../../actions/reporting.actions';
import { BookingsStatProps, BookingStatFilters, EditBookingData } from '../../../types/reporting/bookings';

interface ReportingInitialState extends BookingsStatProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  filters: null,
  data: [],
  totalProductQuantity: 0,
  editBookingData: {} as EditBookingData,
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    resetEditBookingData: (state) => {
      state.editBookingData = {} as EditBookingData;
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
        (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalProductQuantity: action.payload.totalProductQuantity,
        }),
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
      }))
      .addCase(getBookingsEditData.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getBookingsEditData.fulfilled, (state, action: PayloadAction<EditBookingData>) => ({
        ...state,
        status: 'succeeded',
        editBookingData: action.payload,
      }))
      .addCase(getBookingsEditData.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export const { resetEditBookingData } = bookingsSlice.actions;

export default bookingsSlice.reducer;
