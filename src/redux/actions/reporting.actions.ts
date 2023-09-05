import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance, globalConfig } from '../../axios';

const createQueryString = (obj: any) => {
  let query = '?';
  Object.entries(obj).forEach((item) => {
    const [key, value] = item;
    if (value) query += `${key}=${value}&`;
  });
  return query;
};

export const getBankedStat = createAsyncThunk('reporting/getBankedStat', async (params: any = null) => {
  const url = `/Report/datareport?SchoolId=1&Type=banked&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await axiosInstance.get(url, globalConfig);
  return response.data;
});

export const getBankedStatTest = createAsyncThunk('reporting/getBankedStatTest', async (params: any = null) => {
  const url = `/Report/testbankedreport?page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await axiosInstance.get(url);
  return response.data;
});

export const getBookingStat = createAsyncThunk('reporting/getBookingsStat', async () => {
  const url = '/Report/datareport?Type=bookings';
  const response = await axiosInstance.get(url);
  return response.data;
});

export const getBookingFilters = createAsyncThunk('reporting/getBookingsFilters', async (organizationId: number) => {
  const url = `/Report/bookingsfilters?OrganizationId=${organizationId}`;
  const response = await axiosInstance.get(url);
  return response.data;
});

export const sortBookingStat = createAsyncThunk('reporting/sortBookingStat', async (params: any) => {
  const baseUrl = '/Report/sortbookings';
  const response = await axiosInstance.get(baseUrl + createQueryString(params));
  return response.data;
});

export const getChildBookingStat = createAsyncThunk('reporting/getChildBookingsStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=child_only_bookings&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getChildBookingFilters = createAsyncThunk('reporting/getChildBookingsFilters', async (organizationId: number) => {
  const url = `/api/Report/bookingsfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortChildBookingStat = createAsyncThunk('reporting/sortChildBookingStat', async (params: any) => {
  const baseUrl = '/api/Report/sortchildbookings';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getCustomersStat = createAsyncThunk('reporting/getCustomersStat', async (params: any = null) => {
  const url = `/api/Report/datareport?Type=customers&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getEmailTrackerStat = createAsyncThunk('reporting/getEmailTrackerStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=email_tracker&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getInvoicesStat = createAsyncThunk('reporting/getInvoicesStat', async () => {
  const url = '/Report/datareport?Type=invoices';
  const response = await axiosInstance.get(url);
  return response.data;
}); 

export const getOrdersStat = createAsyncThunk('reporting/getOrdersStatt', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=orders&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getProductQuestionsStat = createAsyncThunk('reporting/getProductQuestionsStat', async (params: any = null) => {
  const { page, pageSize, type } = params;
  const url = `/api/Report/datareport?SchoolId=1&Type=${type}&page=${!page ? 1 : page}&pageSize=${!pageSize ? 10 : pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getProductQuestionsFilters = createAsyncThunk('reporting/getProductQuestionsFilters', async (organizationId: number) => {
  const url = `/api/Report/productquestinsfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortProductQuestionsStat = createAsyncThunk('reporting/sortProductQuestionsStat', async (params: any = null) => {
  const baseUrl = '/api/Report/sortrroductquestions?';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getSalesStat = createAsyncThunk('reporting/getSalesStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=sales&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortSalesStat = createAsyncThunk('reporting/sortSalesStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=sales&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getSalesFilters = createAsyncThunk('reporting/getSalesFilters', async (organizationId: number) => {
  const url = `/api/Report/salesfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getTicketsStat = createAsyncThunk('reporting/getTicketsStat', async (params: any = null) => {
  const { page, pageSize } = params;
  const url = `/api/Report/datareport?SchoolId=1&Type=tickets&page=${!page ? 1 : page}&pageSize=${!pageSize ? 10 : pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getTicketsFilters = createAsyncThunk('reporting/getTicketsFilters', async (organizationId: number) => {
  const url = `/api/Report/ticketsfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortTicketsStat = createAsyncThunk('reporting/sortTicketsStat', async (params: any = null) => {
  const baseUrl = '/api/Report/sortrroductquestions';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getTreasurerByEventStat = createAsyncThunk('reporting/getTreasurerByEventStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=treasurer_by_event&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getTreasurerByEventFilters = createAsyncThunk('reporting/getTreasurerByEventFilters', async (organizationId: number) => {
  const url = `/api/Report/treasurerbyeventfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortTreasurerByEventStat = createAsyncThunk('reporting/sortTreasurerByEventStat', async (params: any) => {
  const baseUrl = '/api/Report/sorttreasurerbyevent';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getTreasurerByDateStat = createAsyncThunk('reporting/getTreasurerByDateStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=treasurer_by_date&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortTreasurerByDateStat = createAsyncThunk('reporting/sortTreasurerByDateStat', async (params: any) => {
  const baseUrl = '/api/Report/sorttreasurerbydate';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});

export const getVolunteersStat = createAsyncThunk('reporting/getVolunteersStat', async (params: any = null) => {
  const url = `/api/Report/datareport?SchoolId=1&Type=volunteers&page=${!params?.page ? 1 : params?.page}&pageSize=${!params?.pageSize ? 10 : params?.pageSize}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const getVolunteersFilters = createAsyncThunk('reporting/getVolunteersFilters', async (organizationId: number) => {
  const url = `/api/Report/volunteersfilters?OrganizationId=${organizationId}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
});

export const sortVolunteersStat = createAsyncThunk('reporting/sortVolunteersStat', async (params: any) => {
  const baseUrl = '/api/Report/sortvolunteers';
  const response = await fetch(baseUrl + createQueryString(params));
  const data = await response.json();
  return data;
});
