import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import BasicLayout from '../layouts/BasicLayout/BasicLayout';

const Dashboard = lazy(
  () => import(
    /* webpackChunkName: 'Dashboard' */
    /* webpackPrefetch: true */ '../components/Dashboard/Dashboard'
  ),
);

function Root() {
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <BasicLayout>
            <Suspense fallback={<LoadingOverlay />}>
              <Dashboard />
            </Suspense>
          </BasicLayout>
        )}
      />
    </Routes>
  );
}

export const router = createBrowserRouter([{ path: '*', Component: Root }]);
