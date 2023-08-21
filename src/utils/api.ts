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
