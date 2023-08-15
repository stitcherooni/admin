import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getOrdersStat,
} from '../../actions/reporting.actions';
import { OrdersStatProps } from '../../../types/reporting/orders';
import { Price } from '../../../types/reporting';

interface ReportingInitialState extends OrdersStatProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  totalPlatformFees: {} as Price,
  totalProcessingFees: {} as Price,
  totalSalesAmount: {} as Price,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOrdersStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getOrdersStat.fulfilled, (state, action: PayloadAction<Omit<ReportingInitialState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        totalPlatformFees: action.payload.totalPlatformFees,
        totalProcessingFees: action.payload.totalProcessingFees,
        totalSalesAmount: action.payload.totalSalesAmount,
      }))
      .addCase(getOrdersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default ordersSlice.reducer;
