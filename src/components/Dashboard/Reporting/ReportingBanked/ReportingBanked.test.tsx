import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../../tests-utils/test-utils';
import { headCells } from './table-data';
import { server } from '../../../../tests-utils/server';
import { BankedInitialState } from '../../../../redux/slices/reporting/banked.slice';
import ReportingBanked from './ReportingBanked';

const columnsNames = headCells.map((item) => item.label);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn',
  });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('banked reporting', () => {
  test('if click by Customize View should show customize menu', async () => {
    renderWithProviders(<ReportingBanked />, {
      preloadedState: {
        reporting: {
          banked: {
            status: 'successed',
          } as unknown as BankedInitialState,
        },
      },
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
    renderWithProviders(<ReportingBanked />, {
      preloadedState: {
        reporting: {
          banked: {
            status: 'successed',
          } as unknown as BankedInitialState,
        },
      },
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
    renderWithProviders(<ReportingBanked />, {
      preloadedState: {
        reporting: {
          banked: {
            status: 'successed',
          } as unknown as BankedInitialState,
        },
      },
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
});
