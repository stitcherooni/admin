import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getTicketsFilters,
  getTicketsStat,
  sortTicketsStat,
} from '../../actions/reporting.actions';
import { TicketsFiltersOptions, TicketsProps } from '../../../types/reporting/tickets';

interface ReportingInitialState extends TicketsProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 1,
  qr: '',
  filters: {} as TicketsFiltersOptions,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTicketsStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTicketsStat.fulfilled,
        (state, action: PayloadAction<TicketsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        }),
      )
      .addCase(getTicketsStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getTicketsFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getTicketsFilters.fulfilled,
        (state, action: PayloadAction<TicketsFiltersOptions>) => ({
          ...state,
          status: 'succeeded',
          filters: action.payload,
        }),
      )
      .addCase(getTicketsFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortTicketsStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortTicketsStat.fulfilled,
        (state, action: PayloadAction<TicketsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        }),
      )
      .addCase(sortTicketsStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default ticketsSlice.reducer;
