import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { msalInstance } from '..';
import { silentRequest } from '../authConfig';
import { ApiError } from '../components/shared/ApiErrorsBoundary/ApiErrorsBoundary';

export const formatApiErrors = (errors: ApiError) => {
  const messages = {} as any;
  Object.entries(errors).forEach((error) => {
    const [errorName, errorsList] = error;
    const key = `${errorName.replace(/([a-z](?=[A-Z]))/g, '$1 ')
      .replaceAll('.', ' ')
      .replace('$', '').trim()}`;

    messages[key] = errorsList;
  });

  return messages;
};

export const getAccessToken = async () => {
  const activeAccount = await msalInstance.getActiveAccount();

  if (activeAccount) {
    const accessToken = await msalInstance
      .acquireTokenSilent(silentRequest)
      .then((data) => data.accessToken)
      .catch((err) => {
        throw err;
      });

    return accessToken;
  }

  return null;
};

export const handleInterceptorError = (error: unknown) => {
  if (error instanceof InteractionRequiredAuthError) {
    // fallback to interaction when silent call fails
    return msalInstance.acquireTokenPopup(silentRequest);
  }
  return Promise.reject(error);
};
