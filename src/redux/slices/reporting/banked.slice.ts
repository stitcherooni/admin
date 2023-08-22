import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getBankedStat, getBankedStatTest,
} from '../../actions/reporting.actions';
import { BankedProps } from '../../../types/reporting/banked';
import { Price } from '../../../types/reporting';

export interface BankedInitialState extends BankedProps {
  status: string;
  error?: string | null;
  currency: string;
}

const initialState: BankedInitialState = {
  status: 'loading',
  data: [],
  totalOrdersCount: 0,
  totalSalesAmount: {} as Price,
  totalBankedFee: {} as Price,
  totalPlatformFees: {} as Price,
  totalCount: 0,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  error: null,
  testTransactions: [],
  currency: '',
};

export const bankedSlice = createSlice({
  name: 'banked',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBankedStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getBankedStat.fulfilled, (state, action: PayloadAction<BankedInitialState>) => ({
        ...state,
        status: 'succeeded',
        data: action.payload.data,
        totalOrdersCount: action.payload.totalOrdersCount,
        totalSalesAmount: action.payload.totalSalesAmount,
        totalBankedFee: action.payload.totalBankedFee,
        totalPlatformFees: action.payload.totalPlatformFees,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        currency: action.payload.currency,
      }))
      .addCase(getBankedStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getBankedStatTest.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getBankedStatTest.fulfilled, (state, action: PayloadAction<BankedInitialState>) => ({
        ...state,
        status: 'succeeded',
        testTransactions: action.payload.data,
        totalOrdersCount: action.payload.totalOrdersCount,
        totalSalesAmount: action.payload.totalSalesAmount,
        totalBankedFee: action.payload.totalBankedFee,
        totalPlatformFees: action.payload.totalPlatformFees,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        pageSize: action.payload.pageSize,
        currency: action.payload.currency,
      }))
      .addCase(getBankedStatTest.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default bankedSlice.reducer;
