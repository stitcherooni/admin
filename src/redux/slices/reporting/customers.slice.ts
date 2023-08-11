import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CustomersProps } from '../../../types/reporting/customers';
import { Price } from '../../../types/reporting';
import { getCustomersStat } from '../../actions/reporting.actions';

interface ReportingInitialState extends CustomersProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalOrdersNumber: 0,
  totalOrderValue: {} as Price,
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
      .addCase(getCustomersStat.fulfilled, (state, action: PayloadAction<CustomersProps>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalOrdersNumber: action.payload.totalOrdersNumber,
        totalOrderValue: action.payload.totalOrderValue,
      }))
      .addCase(getCustomersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default customersSlice.reducer;
