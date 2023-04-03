/* eslint-disable no-underscore-dangle */

class UploadsHandler {
  constructor(storageService, albumsService, uploadsValidator) {
    this._storageService = storageService;
    this._albumsService = albumsService;
    this._uploadsValidator = uploadsValidator;
  }

  async postUploadImageHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    this._uploadsValidator.validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);
    const album = await this._albumsService.getAlbumById(id);
    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/upload/covers/${filename}`;

    await this._albumsService.editAlbumById(
      id,
      {
        name: album.name,
        year: album.year,
        coverUrl: fileLocation,
      },
    );

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = UploadsHandler;
