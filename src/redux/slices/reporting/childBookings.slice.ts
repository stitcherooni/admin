import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getChildBookingFilters,
  getChildBookingStat,
  sortChildBookingStat,
} from '../../actions/reporting.actions';
import { ChildBookingFilters, ChildOnlyBookingsProps } from '../../../types/reporting/bookings';

interface ReportingInitialState extends ChildOnlyBookingsProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  filters: null,
};

const childBookingsSlice = createSlice({
  name: 'childBookings',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getChildBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getChildBookingStat.fulfilled,
        (state, action: PayloadAction<ChildOnlyBookingsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        }),
      )
      .addCase(getChildBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortChildBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortChildBookingStat.fulfilled,
        (state, action: PayloadAction<ChildOnlyBookingsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        }),
      )
      .addCase(sortChildBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getChildBookingFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getChildBookingFilters.fulfilled,
        (state, action: PayloadAction<ChildBookingFilters>) => ({
          ...state,
          status: 'succeeded',
          filters: action.payload,
        }),
      )
      .addCase(getChildBookingFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default childBookingsSlice.reducer;
