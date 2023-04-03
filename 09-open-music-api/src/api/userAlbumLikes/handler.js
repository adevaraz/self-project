/* eslint-disable no-underscore-dangle */
class UserAlbumLikesHandler {
  constructor(service, albumsService) {
    this._service = service;
    this._albumsService = albumsService;
  }

  async postUserAlbumLikeHandler(request, h) {
    try {
      const { id: albumId } = request.params;
      const { id: credentialId } = request.auth.credentials;

      await this._albumsService.getAlbumById(albumId);
      await this._service.addUserAlbumLike(credentialId, albumId);

      const response = h.response({
        status: 'success',
        message: 'Berhasil menyukai album',
      });
      response.code(201);
      return response;
    } catch (error) {
      if (error.constraint === 'user_album_unique') {
        const response = h.response({
          status: 'fail',
          message: 'Gagal menyukai album',
        });
        response.code(400);
        return response;
      }

      return error;
    }
  }

  async deleteUserAlbumLikeHandler(request) {
    const { id: albumId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.deleteUserAlbumLike(credentialId, albumId);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    const result = await this._service.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: result.likes,
      },
    });
    response.code(200);
    response.header('X-Data-Source', result.dataSource ? result.dataSource : undefined);
    return response;
  }
}

module.exports = UserAlbumLikesHandler;
