import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CustomersStatProps } from '../../../types/reporting/customers';
import { getCustomersStat, removeCustomer, toggleApproveCustomer } from '../../actions/reporting.actions';

interface ReportingInitialState extends CustomersStatProps {
  status: string;
  error?: string | null;
  message?: string | null;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  totalOrdersNumber: 0,
  totalOrderValue: 0,
  customersCount: 0,
  currency: '',
  error: null,
  message: null,
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
          message: null,
          error: null,
        }),
      )
      .addCase(getCustomersStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
        message: null,
      }))
      .addCase(toggleApproveCustomer.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        toggleApproveCustomer.fulfilled,
        (state, action: PayloadAction<{ userId: number, isApprove: boolean, message: string }>) => {
          const selectedUser = state.data.findIndex((user) => user.id === action.payload.userId);
          const users = [...state.data];
          users[selectedUser] = { ...users[selectedUser], approved: action.payload.isApprove };

          return {
            ...state,
            status: 'succeeded',
            data: users,
            error: null,
            message: action.payload.message,
          }
        },
      )
      .addCase(toggleApproveCustomer.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
        message: null,
      }))
      .addCase(removeCustomer.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        removeCustomer.fulfilled,
        (state, action: PayloadAction<{ userId: number, message: string }>) => {
          const selectedUser = state.data.findIndex((user) => user.id === action.payload.userId);
          const users = [...state.data];
          users.splice(1, selectedUser);

          return {
            ...state,
            status: 'succeeded',
            data: users,
            error: null,
            message: action.payload.message,
          }
        },
      )
      .addCase(removeCustomer.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
        message: null,
      }));
  },
});

export default customersSlice.reducer;
