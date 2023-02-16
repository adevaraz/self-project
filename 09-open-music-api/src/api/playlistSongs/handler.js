/* eslint-disable no-underscore-dangle */
class PlaylistSongsHandler {
  constructor(
    playlistSongsService,
    playlistsService,
    songsService,
    usersService,
    playlistSongActivitiesService,
    validator,
  ) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._usersService = usersService;
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._validator = validator;
  }

  async postPlaylistSongHandler(request, h) {
    await this._validator.validatePostPlaylistSongPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const song = await this._songsService.getSongById(songId);
    const playlist = await this._playlistsService.getPlaylistById(playlistId);

    if (song && playlist) {
      await this._playlistSongsService.addPlaylistSong(playlistId, songId);
      const action = 'add';
      await this._playlistSongActivitiesService.addPlaylistSongActivity({
        playlistId, songId, userId: credentialId, action,
      });
    }

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const playlistSongs = await this._playlistSongsService.getPlaylistSongs(playlistId);
    const playlist = {
      id: playlistSongs[0].playlistId,
      name: playlistSongs[0].name,
      username: playlistSongs[0].username,
      songs: [],
    };

    playlistSongs.forEach((item) => {
      playlist.songs.push({
        id: item.songId,
        title: item.title,
        performer: item.performer,
      });
    });

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongByIdHandler(request) {
    await this._validator.validateDeletePlaylistSongPayload(request.payload);
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { songId } = request.payload;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongById(playlistId, songId);
    const action = 'delete';
    await this._playlistSongActivitiesService.addPlaylistSongActivity({
      playlistId, songId, userId: credentialId, action,
    });

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }
}

module.exports = PlaylistSongsHandler;
