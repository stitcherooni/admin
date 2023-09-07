import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getChildBookingFilters,
  getChildBookingStat,
  getTestChildBookingStat,
  sortChildBookingStat,
} from '../../actions/reporting.actions';
import { ChildBookingFilters, ChildOnlyBookingsStatProps } from '../../../types/reporting/bookings';
import { ReportingFiltersChildBookings } from '../../../components/Dashboard/Reporting/ReportingChildBooking/ReportingChildBooking';

export interface ReportingChildBookingsInitialState extends ChildOnlyBookingsStatProps {
  status: string;
  error?: string | null;
  selectedFilters: ReportingFiltersChildBookings;
}

const initialState: ReportingChildBookingsInitialState = {
  status: 'loading',
  data: [],
  testData: [],
  soldQuantity: 0,
  filters: null,
  selectedFilters: {
    event: {
      value: '',
      year: '',
      label: '',
    },
    groupBy: '',
  } as ReportingFiltersChildBookings,
};

const childBookingsSlice = createSlice({
  name: 'childBookings',
  initialState,
  reducers: {
    updateSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getChildBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getChildBookingStat.fulfilled,
        (state, action: PayloadAction<Omit<ReportingChildBookingsInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          soldQuantity: action.payload.soldQuantity,
          error: null,
        }),
      )
      .addCase(getChildBookingStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getTestChildBookingStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTestChildBookingStat.fulfilled,
        (state, action: PayloadAction<Omit<ReportingChildBookingsInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          testData: action.payload.data,
          soldQuantity: action.payload.soldQuantity,
          error: null,
        }),
      )
      .addCase(getTestChildBookingStat.rejected, (state, action) => ({
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
        (state, action: PayloadAction<Omit<ReportingChildBookingsInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          soldQuantity: action.payload.soldQuantity,
          error: null,
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
          error: null,
        }),
      )
      .addCase(getChildBookingFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export const { updateSelectedFilters } = childBookingsSlice.actions;

export default childBookingsSlice.reducer;
