import { axiosInstance, globalConfig } from '../axios';

export const downloadFile = (
  url: string,
  fileName: string,
  body: any,
  errorCb: (message: string | null) => void,
) => axiosInstance.post(url, body, {
  responseType: 'blob',
  ...globalConfig,
})
  .then((response) => {
    if (response.status === 200) {
      const href = window.URL.createObjectURL(response.data);
      const anchorElement = document.createElement('a');
      anchorElement.href = href;
      anchorElement.download = fileName;
      document.body.appendChild(anchorElement);
      anchorElement.click();
      document.body.removeChild(anchorElement);
      window.URL.revokeObjectURL(href);
    }
  })
  .catch((error) => {
    if (errorCb) errorCb(process.env.NODE_ENV === 'development' ? error.message : 'Failed request to load file');
  });
