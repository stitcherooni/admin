import React from 'react';
import {
  act,
  screen, waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { renderWithProviders } from '../../../../tests-utils/test-utils';
import { headCells, rows } from './table-data';
import { server } from '../../../../tests-utils/server';
import ReportingBooking from './ReportingBooking';
import { BookingInitialState } from '../../../../redux/slices/reporting/bookings.slice';
import * as utils from './utils';

jest.spyOn(utils, 'getFetchBookingsFn');


beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const columnsNames = headCells.map((item) => item.label);

describe('Reporting Bookings', () => {
  test('if we click by Select random we should see modal for choose random bookings counts', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              testData: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });

    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Select Random/));

    waitFor(() => {
      expect(screen.queryByText(/Select random bookings/)).toBeInTheDocument();
    });
  });

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

  test('if click by Export doors list should show customize menu', async () => {
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

    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customize View/));

    await waitFor(() => {
      columnsNames.forEach((item) => {
        expect(screen.getByDisplayValue(item)).toBeInTheDocument();
      });
    });
  });

  test('if click by checked element should hide column', async () => {
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
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customize View/));
    await userEvent.click(screen.getByDisplayValue('##'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('##')).not.toBeChecked();
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('##')).toBeNull();
    });
  });

  test('if click by unchecked element should show column', async () => {
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
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customize View/));
    await userEvent.click(screen.getByDisplayValue('##'));
    await userEvent.click(screen.getByDisplayValue('##'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('##')).toBeChecked();
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('##')).not.toBeNull();
    });
  });

  test('if cant download file should show an error', async () => {
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
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Excel/));

    server.use(rest.post('/api/Report/bookingsexcel', async (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Failed request to load file' }))));

    await waitFor(() => {
      expect(screen.queryByText('Failed request to load file')).toBeInTheDocument();
    });
  });

  test('if request failed should show error message', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'error',
              error: 'Error',
              data: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    });
  });

  test('if havent records show warning message', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              data: [],
            } as unknown as BookingInitialState,
          },
        },
      });
    });
    await waitFor(() => {
      expect(screen.getByText(/There are no bookings/)).toBeInTheDocument();
    });
  });

  test('if click by test bookings should fetch data and show warning', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              testData: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await server.use(rest.get('/api/Report/datareport', async (req, res, ctx) => res(ctx.status(200), ctx.json({ testData: [] }))));
    await userEvent.click(screen.getByText(/Show Test Bookings/));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.getByTestId('test-bookings')).toBeInTheDocument();
    });
  });

  test('if have test bookings we shouldnt see Test bookings button and need to see Live bookings', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              testData: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Test Bookings/));

    await waitFor(() => {
      expect(screen.queryByText(/Show Test Bookings/)).not.toBeInTheDocument();
      expect(utils.getFetchBookingsFn).toHaveBeenCalledWith(true);
    });

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText(/Actions/));

    await waitFor(() => {
      expect(screen.getByText(/Show Live Bookings/)).toBeInTheDocument();
    });
  });

  test('if we click by Live bookings we shouldnt see Test bookings warning', async () => {
    act(() => {
      renderWithProviders(<ReportingBooking />, {
        preloadedState: {
          reporting: {
            bookings: {
              status: 'successed',
              testData: rows,
            } as unknown as BookingInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Test Bookings/));

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Live Bookings/));

    waitFor(() => {
      expect(utils.getFetchBookingsFn).toHaveBeenCalledWith(false);
      expect(screen.queryByTestId('test-bookings')).not.toBeInTheDocument();
    });
  });
});
