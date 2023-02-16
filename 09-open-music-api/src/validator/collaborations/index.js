const InvariantError = require('../../exceptions/InvariantError');
const { PostCollaborationPayloadSchema, DeleteCollaborationPayloadSchema } = require('./schema');

const CollaborationsValidator = {
  validatePostCollaborationPayload: (payload) => {
    const valdiationResult = PostCollaborationPayloadSchema.validate(payload);
    if (valdiationResult.error) {
      throw new InvariantError(valdiationResult.error.message);
    }
  },
  validateDeleteCollaborationPayload: (payload) => {
    const valdiationResult = DeleteCollaborationPayloadSchema.validate(payload);
    if (valdiationResult.error) {
      throw new InvariantError(valdiationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
