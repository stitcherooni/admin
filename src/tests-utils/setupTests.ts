// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';

jest.mock('..', () => ({
  msalInstance: {
    getLogger: () => ({
      clone: () => ({
        verbose: () => jest.fn(),
        info: () => jest.fn(),
      }),
    }),
    getAllAccounts: jest.fn().mockImplementation(() => []),
    initializeWrapperLibrary: jest.fn(),
    addEventCallback: jest.fn(),
    verbose: '',
    initialize: jest.fn().mockReturnValue(Promise.resolve()),
    handleRedirectPromise: jest.fn().mockReturnValue(Promise.resolve()),
  },
}));
