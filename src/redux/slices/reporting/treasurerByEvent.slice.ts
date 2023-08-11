import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  TreasurerByEventFilters,
  TreasurerByEventProps,
} from '../../../types/reporting/treasurerByEvent';
import { getTreasurerByEventFilters, getTreasurerByEventStat, sortTreasurerByEventStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends TreasurerByEventProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  filters: {} as TreasurerByEventFilters,
  totalSales: 0,
  profit: 0,
  processingFeeNotPaid: 0,
  platformFeesNotPaid: 0,
};

const treasurerByEventSlice = createSlice({
  name: 'treasurerByEvent',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTreasurerByEventStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTreasurerByEventStat.fulfilled,
        (state, action: PayloadAction<ReportingInitialState>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalSales: action.payload.totalSales,
          profit: action.payload.profit,
          processingFeeNotPaid: action.payload.processingFeeNotPaid,
          platformFeesNotPaid: action.payload.platformFeesNotPaid,
        })
      )
      .addCase(getTreasurerByEventStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getTreasurerByEventFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTreasurerByEventFilters.fulfilled,
        (state, action: PayloadAction<TreasurerByEventFilters>) => ({
          ...state,
          status: 'succeeded',
          filters: action.payload,
        })
      )
      .addCase(getTreasurerByEventFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortTreasurerByEventStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortTreasurerByEventStat.fulfilled,
        (state, action: PayloadAction<ReportingInitialState>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
        })
      )
      .addCase(sortTreasurerByEventStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default treasurerByEventSlice.reducer;
