const path = require('path');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/covers',
    handler: (request, h) => handler.postUploadImageHandler(request, h),
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: process.env.MAX_COVER_SIZE_BYTES,
      },
    },
  },
  {
    method: 'GET',
    path: '/upload/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, 'file'),
      },
    },
  },
];

module.exports = routes;
