import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CustomersStatProps } from '../../../types/reporting/customers';
import { getCustomersStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends CustomersStatProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalOrdersNumber: 0,
  totalOrderValue: 0,
  customersCount: 0,
  currency: '',
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCustomersStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getCustomersStat.fulfilled,
        (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalOrdersNumber: action.payload.totalOrdersNumber,
          totalOrderValue: action.payload.totalOrderValue,
          currency: action.payload.currency,
          customersCount: action.payload.customersCount,
        }),
      )
      .addCase(getCustomersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default customersSlice.reducer;
