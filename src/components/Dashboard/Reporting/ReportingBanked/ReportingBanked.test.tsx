import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { renderWithProviders } from '../../../../tests-utils/test-utils';
import { headCells, rows } from './table-data';
import { server } from '../../../../tests-utils/server';
import { BankedInitialState } from '../../../../redux/slices/reporting/banked.slice';
import ReportingBanked from './ReportingBanked';
import * as utils from './utils';

jest.spyOn(utils, 'getFetchBankedFn');

const columnsNames = headCells.map((item) => item.label);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('banked reporting', () => {
  test('if click by Customize View should show customize menu', async () => {
    act(() => {
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
            } as unknown as BankedInitialState,
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
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
            } as unknown as BankedInitialState,
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
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
            } as unknown as BankedInitialState,
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
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
            } as unknown as BankedInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Export Excel/));

    server.use(rest.post('/api/Report/bankedspdf', async (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Failed request to load file' }))));

    await waitFor(() => {
      expect(screen.queryByText('Failed request to load file')).toBeInTheDocument();
    });
  });

  test('if request failed should show error message', async () => {
    act(() => {
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'error',
              error: 'Error',
            } as unknown as BankedInitialState,
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
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
              data: [],
            } as unknown as BankedInitialState,
          },
        },
      });
    });
    await waitFor(() => {
      expect(screen.getByText(/There are no banked transactions/)).toBeInTheDocument();
    });
  });

  test('if click by test transactions should fetch data and show warning', async () => {
    act(() => {
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
              testTransactions: [],
            } as unknown as BankedInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await server.use(rest.get('/api/Report/testbankedreport', async (req, res, ctx) => res(ctx.status(200), ctx.json({ testTransactions: [] }))));
    await userEvent.click(screen.getByText(/Show Test Transactions/));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.getByTestId('test-transactions')).toBeInTheDocument();
    });
  });

  test('if have test transactions we shouldnt see Test transactions button and need to see Live transactions', async () => {
    act(() => {
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
              testTransactions: rows,
            } as unknown as BankedInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Test Transactions/));

    await waitFor(() => {
      expect(screen.queryByText(/Show Test Transactions/)).not.toBeInTheDocument();
      expect(utils.getFetchBankedFn).toHaveBeenCalledWith(true);
    });

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText(/Actions/));

    await waitFor(() => {
      expect(screen.getByText(/Show Live Transactions/)).toBeInTheDocument();
    });
  });

  test('if we click by Live transactions we shouldnt see Test transactions warning', async () => {
    act(() => {
      renderWithProviders(<ReportingBanked />, {
        preloadedState: {
          reporting: {
            banked: {
              status: 'successed',
              testTransactions: rows,
            } as unknown as BankedInitialState,
          },
        },
      });
    });
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Test Transactions/));

    await userEvent.keyboard('{Escape}');
    await userEvent.click(screen.getByText(/Actions/));
    await userEvent.click(screen.getByText(/Show Live Transactions/));

    waitFor(() => {
      expect(utils.getFetchBankedFn).toHaveBeenCalledWith(false);
      expect(screen.queryByTestId('test-transactions')).not.toBeInTheDocument();
    });
  });
});
