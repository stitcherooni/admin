import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDashboardStat = createAsyncThunk('dashboard/getStat', async (params?) => {
  const url = `/api/Report/dashboarddata?page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});
