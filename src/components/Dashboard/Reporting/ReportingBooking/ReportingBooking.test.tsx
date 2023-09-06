import React from 'react';
import {
  act,
  screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../tests-utils/test-utils';
import { rows } from './table-data';
import { server } from '../../../../tests-utils/server';
import ReportingBooking from './ReportingBooking';
import { BookingInitialState } from '../../../../redux/slices/reporting/bookings.slice';

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Reporting Bookings', () => {
  test('if click by order id should show order details', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              data: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });

    await userEvent.click(screen.getByText(/36/));

    await waitFor(() => {
      expect(screen.getByText(/Order Details:/)).toBeInTheDocument();
    });
  });
});
