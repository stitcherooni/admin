import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VolunteersFIlters, VolunteersProps } from '../../../types/reporting/volunteers';
import { getVolunteersFilters, getVolunteersStat, sortVolunteersStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends VolunteersProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  filters: {} as VolunteersFIlters,
  totalSales: 0,
  profit: 0,
  processingFeeNotPaid: 0,
  platformFeesNotPaid: 0,
};

const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getVolunteersStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getVolunteersStat.fulfilled,
        (state, action: PayloadAction<ReportingInitialState>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        })
      )
      .addCase(getVolunteersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getVolunteersFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getVolunteersFilters.fulfilled,
        (state, action: PayloadAction<VolunteersFIlters>) => ({
          ...state,
          status: 'succeeded',
          filters: action.payload,
        })
      )
      .addCase(getVolunteersFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortVolunteersStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortVolunteersStat.fulfilled,
        (state, action: PayloadAction<ReportingInitialState>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
        })
      )
      .addCase(sortVolunteersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default volunteersSlice.reducer;
