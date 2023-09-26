import React, { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
} from 'react-router-dom';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';
import Reporting from '../components/Dashboard/Reporting/Reporting';
import LoadingOverlay from '../components/shared/LoadingOverlay/LoadingOverlay';
import { ProtectedRoute } from './ProtectedRoute';
import Listings from '../components/Dashboard/Listings/Listings';

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
  <ProtectedRoute>
    <BasicLayout>
      <Suspense fallback={<LoadingOverlay />}>
        <Dashboard />
      </Suspense>
    </BasicLayout>
  </ProtectedRoute>,
  },
  {
    path: '/dashboard',
    element:
  <ProtectedRoute>
    <BasicLayout>
      <Suspense fallback={<LoadingOverlay />}>
        <Dashboard />
      </Suspense>
    </BasicLayout>
  </ProtectedRoute>,
  },
  {
    path: '/dashboard/reporting',
    element:
  <ProtectedRoute>
    <BasicLayout>
      <Suspense fallback={<LoadingOverlay />}>
        <Reporting />
      </Suspense>
    </BasicLayout>
  </ProtectedRoute>,
  },
  {
    path: '/dashboard/listings',
    element:
  <ProtectedRoute>
    <BasicLayout>
      <Suspense fallback={<LoadingOverlay />}>
        <Listings />
      </Suspense>
    </BasicLayout>
  </ProtectedRoute>,
  },
]);
