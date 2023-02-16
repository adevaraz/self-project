/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class PlaylistSongActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistSongActivity({
    playlistId, songId, userId, action,
  }) {
    const id = `playlist-song-activity-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, userId, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Activity gagal ditambahkan');
    }
  }

  async getPlaylistSongActivities(playlistId) {
    const query = {
      text: `SELECT
        users.username as username,
        songs.title as title,
        playlist_song_activities.action as action,
        playlist_song_activities.time as time
      FROM playlist_song_activities
      LEFT JOIN songs ON songs.id = playlist_song_activities.song_id
      LEFT JOIN users ON users.id = playlist_song_activities.user_id
      WHERE playlist_song_activities.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongActivitiesService;
