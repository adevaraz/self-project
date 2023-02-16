const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: (request) => handler.getPlaylistSongActivitiesHandler(request),
    options: {
      auth: 'openmusicapp_jwt',
    },
  },
];

module.exports = routes;
