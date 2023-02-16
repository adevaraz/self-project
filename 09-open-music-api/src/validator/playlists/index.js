const InvariantError = require('../../exceptions/InvariantError');
const { PlaylistPayloadSchema } = require('./schema');

const PlaylistsValidator = {
  validatePlaylistPayload: (payload) => {
    const valdiationResult = PlaylistPayloadSchema.validate(payload);
    if (valdiationResult.error) {
      throw new InvariantError(valdiationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
