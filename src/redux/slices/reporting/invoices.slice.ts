import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getInvoicesStat,
} from '../../actions/reporting.actions';
import { InvoicesProps } from '../../../types/reporting/invoices';

interface ReportingInitialState extends InvoicesProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getInvoicesStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getInvoicesStat.fulfilled, (state, action: PayloadAction<InvoicesProps>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
      }))
      .addCase(getInvoicesStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default invoicesSlice.reducer;
