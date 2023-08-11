import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TreasurerByDateProps } from '../../../types/reporting/treasurerByDate';
import { getTreasurerByDateStat, sortTreasurerByDateStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends TreasurerByDateProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalSales: 0,
  profit: 0,
  processingFeeNotPaid: 0,
  platformFeesNotPaid: 0,
};

const treasurerByDateSlice = createSlice({
  name: 'treasurerByDate',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTreasurerByDateStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTreasurerByDateStat.fulfilled,
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
      .addCase(getTreasurerByDateStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))

      .addCase(sortTreasurerByDateStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortTreasurerByDateStat.fulfilled,
        (state, action: PayloadAction<ReportingInitialState>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
        })
      )
      .addCase(sortTreasurerByDateStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default treasurerByDateSlice.reducer;
