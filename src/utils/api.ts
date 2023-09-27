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
      .then(async (data) => {
        if (!data.accessToken.length) {
          throw new InteractionRequiredAuthError();
        }

        return data.accessToken;
      })
      .catch(async () => {
        await msalInstance.logoutPopup();
      });

    return accessToken;
  }

  return null;
};

export const handleInterceptorError = (error: unknown) => {
  if (error instanceof InteractionRequiredAuthError) {
    return msalInstance.acquireTokenPopup(silentRequest)
      .then((response) => response).catch(async () => {
        msalInstance.loginRedirect();
      });
  }
  return Promise.reject(error);
};
