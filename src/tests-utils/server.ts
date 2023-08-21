import { rest } from 'msw';
import { setupServer } from 'msw/node';

export const server = setupServer(
  rest.post('/api/Report/bankedspdf', async (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Failed request to load file' }))),
  rest.post('/api/Report/bankedsexcel', async (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Failed request to load file' }))),
);
