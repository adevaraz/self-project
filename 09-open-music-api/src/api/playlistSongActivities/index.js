const PlaylistSongActivitiesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist-song-activites',
  version: '1.0.0',
  register: async (server, { playlistSongActivitiesService, playlistsService }) => {
    const playlistSongActivitesHandler = new PlaylistSongActivitiesHandler(
      playlistSongActivitiesService,
      playlistsService,
    );
    server.route(routes(playlistSongActivitesHandler));
  },
};
