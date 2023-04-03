/* eslint-disable no-underscore-dangle */
class ExportsHandler {
  constructor(exportsService, playlistsService, validator) {
    this._exportsService = exportsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  async postExportsPlaylistHandler(request, h) {
    await this._validator.validateExportPlaylistPayload(request.payload);

    // check if playlist is exist
    const { playlistId } = request.params;
    await this._playlistsService.getPlaylistById(playlistId);

    // verify user access
    const { id: userId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, userId);

    const message = {
      playlistId,
      targetEmail: request.payload.targetEmail,
    };

    await this._exportsService.sendMessage('export:playlist', JSON.stringify(message));

    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}

module.exports = ExportsHandler;
