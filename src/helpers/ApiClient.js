import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];

export default class ApiClient {
  constructor() {
    const self = this;
    methods.forEach(function(method) {
      self[method] = (path, { headers, body, data, params, progress } = {}) => new Promise((resolve, reject) => {
        // Our superagent request
        const request = superagent[method](path);

        // Attach custom headers
        if (headers && headers.length) {
          headers.forEach((h) => {
            request.set(h);
          });
        }

        // Attach uploadData to request
        if (params && params.uploadData) {
          const attrName = Object.keys(params.uploadData)[0];
          params.uploadData[attrName].forEach((f) => {
            request.attach(attrName, f, f.filename);
          });
          delete params.uploadData;  // eslint-disable-line

          // Progress event
          if (progress) {
            request.on('progress', progress);
          }
        }

        // Request payload
        if (params) {
          request.query(params);
        }

        // Send as JSON
        if (body) {
          request.send(body);

        // Send as FormData
        } else if (data) {
          request.type('form').send(data);
        }

        request.end((err, result = {}) => err ? reject(result.body || err) : resolve(result));  // eslint-disable-line
      });
    });
  }
}
