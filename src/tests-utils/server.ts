import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  rest.post('/api/Report/bankedspdf', null as any),
  rest.post('/api/Report/bankedsexcel', null as any),
  rest.get('/api/Report/datareport', null as any),
  rest.get('/api/Report/testbankedreport', null as any),
);
