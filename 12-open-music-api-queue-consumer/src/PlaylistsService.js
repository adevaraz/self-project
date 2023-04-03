const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT
        playlists.id as playlist_id,
        playlists.name as name,
        songs.id as song_id,
        songs.title as title,
        songs.performer as performer
      FROM playlist_songs
      LEFT JOIN playlists ON playlists.id = playlist_songs.playlist_id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1 `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    const songs = result.rows.map(item => ({ id: item.song_id, title: item.title, performer: item.performer }));
    const playlist = {
      id: result.rows[0].playlist_id,
      name: result.rows[0].name,
      songs,
    }
    return playlist;
  }
}

module.exports = PlaylistsService;