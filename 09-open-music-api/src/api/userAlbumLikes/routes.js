const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.postUserAlbumLikeHandler(request, h),
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{id}/likes',
    handler: (request, h) => handler.getAlbumLikesHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}/likes',
    handler: (request) => handler.deleteUserAlbumLikeHandler(request),
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
