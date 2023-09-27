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
import * as utils from './utils';
import ReportingChildBooking from './ReportingChildBooking';
import { ReportingChildBookingsInitialState } from '../../../../redux/slices/reporting/childBookings.slice';

jest.spyOn(utils, 'getFetchChildBookingsFn');

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const columnsNames = headCells.map((item) => item.label);

const selectedFilters = {
  event: {
    year: 2020,
    value: 2020,
    label: 2020,
  },
};

describe('Reporting Child Bookings', () => {
  test('if click by Customise View list should show customize menu', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              data: rows,
              selectedFilters: {
                ...selectedFilters,
                groupBy: 'noGroup',
              },
              filters: {
                year: {
                  2020: [],
                },
                groupBy: [],
              },
            } as unknown as ReportingChildBookingsInitialState,
          },
        },
      });
    });

    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customise View/));

    await waitFor(() => {
      columnsNames.forEach((item) => {
        expect(screen.getByDisplayValue(item)).toBeInTheDocument();
      });
    });
  });

  test('if click by checked element should hide column', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              data: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
          },
        },
      });
    });

    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customise View/));
    await userEvent.click(screen.getByDisplayValue('First Name'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('First Name')).not.toBeChecked();
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('First Name')).toBeNull();
    });
  });

  test('if click by unchecked element should show column', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              data: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
          },
        },
      });
    });

    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Customise View/));
    await userEvent.click(screen.getByDisplayValue('First Name'));
    await userEvent.click(screen.getByDisplayValue('First Name'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('First Name')).toBeChecked();
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      expect(screen.queryByText('First Name')).not.toBeNull();
    });
  });

  test('if cant download file should show an error', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              data: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Export to Excel/));

    server.use(rest.post('/api/Report/childonlybookingsexcel', async (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Failed request to load file' }))));

    await waitFor(() => {
      expect(screen.queryByText('Failed request to load file')).toBeInTheDocument();
    });
  });

  test('if request failed should show error message', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'error',
              error: 'Error',
              data: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
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
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              data: [],
              selectedFilters: {
                event: {
                  year: '',
                },
              },
            } as unknown as ReportingChildBookingsInitialState,
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
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              testData: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
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
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              testData: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Test Bookings/));

    await waitFor(() => {
      expect(screen.queryByText(/Show Test Bookings/)).not.toBeInTheDocument();
      expect(utils.getFetchChildBookingsFn).toHaveBeenCalledWith(true);
    });

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText(/Actions/));

    await waitFor(() => {
      expect(screen.getByText(/Show Live Bookings/)).toBeInTheDocument();
    });
  });

  test('if we click by Live bookings we shouldnt see Test bookings warning', async () => {
    act(() => {
      renderWithProviders(<ReportingChildBooking />, {
        preloadedState: {
          reporting: {
            childBookings: {
              status: 'successed',
              testData: rows,
              selectedFilters,
            } as unknown as ReportingChildBookingsInitialState,
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
      expect(utils.getFetchChildBookingsFn).toHaveBeenCalledWith(false);
      expect(screen.queryByTestId('test-bookings')).not.toBeInTheDocument();
    });
  });
});
