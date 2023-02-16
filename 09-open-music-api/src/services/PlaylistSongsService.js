/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapPlaylistSongsListDBToModel } = require('../../utils');
const NotFoundError = require('../exceptions/NotFoundError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSong(playlistId, songId) {
    const id = `playlist-song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, playlistId, songId, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Lagu gagal ditambahkan ke Playlist');
    }
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: `SELECT
        playlists.id as playlist_id,
        playlists.name as name,
        users.username as username,
        songs.id as song_id,
        songs.title as title,
        songs.performer as performer
      FROM playlist_songs
      LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      LEFT JOIN users ON playlists.owner = users.id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows.map(mapPlaylistSongsListDBToModel);
  }

  async deletePlaylistSongById(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = PlaylistSongsService;
