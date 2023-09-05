import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getInvoicesStat } from '../../actions/reporting.actions';
import { InvoicesStatProps } from '../../../types/reporting/invoices';

interface ReportingInitialState extends InvoicesStatProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
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
      .addCase(getInvoicesStat.fulfilled, (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
      }))
      .addCase(getInvoicesStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default invoicesSlice.reducer;
