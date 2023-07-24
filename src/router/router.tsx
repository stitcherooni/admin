import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Reporting from '../components/Dashboard/Reporting/Reporting';
import LoadingOverlay from '../components/shared/LoadingOverlay/LoadingOverlay';

const Dashboard = lazy(
  () => import(
    /* webpackChunkName: 'Dashboard' */
    /* webpackPrefetch: true */ '../components/Dashboard/Dashboard'
  ),
);

export const router = createBrowserRouter([
  {
    path: '/',
    element:
  <BasicLayout>
    <Suspense fallback={<LoadingOverlay />}>
      <Dashboard />
    </Suspense>
  </BasicLayout>,
  },
  {
    path: '/dashboard',
    element:
  <BasicLayout>
    <Suspense fallback={<LoadingOverlay />}>
      <Dashboard />
    </Suspense>
  </BasicLayout>,
  },
  {
    path: '/dashboard/reporting',
    element:
  <BasicLayout>
    <Suspense fallback={<LoadingOverlay />}>
      <Reporting />
    </Suspense>
  </BasicLayout>,
  },
]);
