/* eslint-disable no-underscore-dangle */
class ExportsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postExportsPlaylistHandler(request, h) {
    this._validator.validateExportPlaylistPayload(request.payload);

    const message = {
      userId: request.auth.credential.id,
      paylistId: request.params.playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._service.sendMessage('export:playlist', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
