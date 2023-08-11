import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDashboardStat } from '../actions/dashboard.actions';

export interface DashboardState {
  stat: {
    sales: number;
    orders: number;
    avgOrderValue: number;
    customers: number;
    events: number;
    products: number;
    sponsors: number;
    businessDirectory: number;
  };
  currentLiveSales: {
    data: {
      key: string;
      value: {
        data: {
          name: string;
          type: string;
          startDate: string;
          endDate: string;
          price: number;
          quantitySold: number;
          quantityLeft: number;
          sales: number;
          currency: string;
        }[];
        totalQuantitySold: number;
        totalQuantityLeft: number;
        totalSales: number;
        currency: string;
      };
    }[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  monthlyOrders: {
    data: {
      month: string;
      orders: number;
      sales: number;
      currency: string;
    }[];
    totqalOrders: number;
    totalSales: number;
    currency: null;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  monthlyCustomersRegistrations: {
    data: {
      month: string;
      registations: number;
    }[];
    totalRegistrations: number;
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
  lastOrders: {
    orderId: number;
    date: string;
    customerName: string;
    customerId: number;
    value: number;
    currency: string;
  }[];
  status: string;
  error?: string;
}

const initialState: DashboardState = {
  stat: {
    sales: 0,
    orders: 0,
    avgOrderValue: 0,
    customers: 0,
    events: 0,
    products: 0,
    sponsors: 0,
    businessDirectory: 0,
  },
  currentLiveSales: {
    data: [],
    totalCount: 1,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
  },
  monthlyOrders: {
    data: [],
    totqalOrders: 0,
    totalSales: 0,
    currency: null,
    totalCount: 36,
    totalPages: 4,
    currentPage: 1,
    pageSize: 10,
  },
  monthlyCustomersRegistrations: {
    data: [],
    totalRegistrations: 0,
    totalCount: 36,
    totalPages: 4,
    currentPage: 1,
    pageSize: 10,
  },
  lastOrders: [],
  status: 'loading',
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(getDashboardStat.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getDashboardStat.fulfilled, (state, action: PayloadAction<Omit<DashboardState, 'status'>>) => ({
        ...state,
        status: 'succeeded',
        stat: action.payload.stat,
        currentLiveSales: action.payload.currentLiveSales,
        monthlyOrders: action.payload.monthlyOrders,
        monthlyCustomersRegistrations: action.payload.monthlyCustomersRegistrations,
        lastOrders: action.payload.lastOrders,
      }))
      .addCase(getDashboardStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default dashboardSlice.reducer;
