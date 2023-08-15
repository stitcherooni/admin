import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EmailTrackerTrackerProps } from '../../../types/reporting/emailTracker';
import { getEmailTrackerStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends EmailTrackerTrackerProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalEmailsSent: 0,
  totalEmailsDelivered: 0,
  totalEmailsOpened: 0,
};

const emailTrackerSlice = createSlice({
  name: 'emailTracker',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEmailTrackerStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getEmailTrackerStat.fulfilled,
        (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
          totalEmailsSent: action.payload.totalEmailsSent,
          totalEmailsDelivered: action.payload.totalEmailsDelivered,
          totalEmailsOpened: action.payload.totalEmailsOpened,
        }),
      )
      .addCase(getEmailTrackerStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default emailTrackerSlice.reducer;
