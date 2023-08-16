import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getSalesFilters,
  getSalesStat,
  sortSalesStat,
} from '../../actions/reporting.actions';
import {
  SalesDataProps, SalesEvents, SalesFiltersProps, SalesProps,
} from '../../../types/reporting/sales';

interface ReportingInitialState extends SalesProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: {} as SalesDataProps,
  totalSales: 0,
  totalSalesValue: 0,
  avgSalesValue: 0,
  platformBookingFees: 0,
  currency: 'GBP',
  filters: {} as SalesFiltersProps,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSalesStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getSalesStat.fulfilled,
        (state, action: PayloadAction<SalesProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalSales: action.payload.totalSales,
          totalSalesValue: action.payload.totalSalesValue,
          avgSalesValue: action.payload.avgSalesValue,
          platformBookingFees: action.payload.platformBookingFees,
          currency: action.payload.currency,
        }),
      )
      .addCase(getSalesStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortSalesStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortSalesStat.fulfilled,
        (state, action: PayloadAction<SalesProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          totalSales: action.payload.totalSales,
          totalSalesValue: action.payload.totalSalesValue,
          avgSalesValue: action.payload.avgSalesValue,
          platformBookingFees: action.payload.platformBookingFees,
          currency: action.payload.currency,
        }),
      )
      .addCase(sortSalesStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getSalesFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getSalesFilters.fulfilled,
        (state, action: PayloadAction<SalesEvents>) => ({
          ...state,
          status: 'succeeded',
          filters: {
            events: { ...action.payload },
          },
        }),
      )
      .addCase(getSalesFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default salesSlice.reducer;
