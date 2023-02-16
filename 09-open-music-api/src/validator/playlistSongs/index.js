const InvariantError = require('../../exceptions/InvariantError');
const { PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema } = require('./schema');

const PlaylistSongsValidator = {
  validatePostPlaylistSongPayload: (payload) => {
    const valdiationResult = PostPlaylistSongPayloadSchema.validate(payload);
    if (valdiationResult.error) {
      throw new InvariantError(valdiationResult.error.message);
    }
  },
  validateDeletePlaylistSongPayload: (payload) => {
    const valdiationResult = DeletePlaylistSongPayloadSchema.validate(payload);
    if (valdiationResult.error) {
      throw new InvariantError(valdiationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
