export const downloadFile = (url: string, fileName: string) => fetch(url, {
  method: 'GET',
  // headers: new Headers({
  //     "Authorization": "Bearer " + token
  // })
})
  .then((response) => response.blob())
  .then((blob) => {
    const fileUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  });
