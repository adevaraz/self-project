const UserAlbumLikesHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'user-album-likes',
  version: '1.0.0',
  register: async (server, { service, albumsService }) => {
    const userAlbumLikesHandler = new UserAlbumLikesHandler(service, albumsService);
    server.route(routes(userAlbumLikesHandler));
  },
};
