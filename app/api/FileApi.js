let apiSender = require('./ApiSender');

module.exports = {
  getS3SigningRequest: (fileName, fileType) => {
    let route = `/api/s3/sign?file-name=${fileName}&file-type=${fileType}`;
    return apiSender.get(route);
  },
  uploadFileToS3: (file, signedRequest) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve();
          } else {
            reject('Could not upload file')
          }
        }
      }

      xhr.send(file);
    })
  }
}
