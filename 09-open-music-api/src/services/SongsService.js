/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const { mapSongsDBToModel } = require('../../utils');
const NotFoundError = require('../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, genre, performer, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs(albumId, filter) {
    const query = {
      text: 'SELECT * FROM songs',
      values: [],
    };

    if (albumId && filter.title && filter.performer) {
      query.text += ' WHERE album_id = $1 AND title ILIKE $2 AND performer ILIKE $3';
      query.values = [albumId, `%${filter.title}%`, `%${filter.performer}%`];
    } else if (albumId) {
      query.text += ' WHERE album_id = $1';
      query.values = [albumId];
    } else if (filter.title && filter.performer) {
      query.text += ' WHERE title ILIKE $1 AND performer ILIKE $2';
      query.values = [`%${filter.title}%`, `%${filter.performer}%`];
    } else if (filter.title) {
      query.text += ' WHERE title ILIKE $1';
      query.values = [`%${filter.title}%`];
    } else if (filter.performer) {
      query.text += ' WHERE performer ILIKE $1';
      query.values = [`%${filter.performer}%`];
    }

    const result = await this._pool.query(query);

    return result.rows.map((row) => ({ id: row.id, title: row.title, performer: row.performer }));
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map(mapSongsDBToModel)[0];
  }

  async getSongsByAlbumId(albumId) {
    const query = {
      text: 'SELECT * FROM songs WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }

    return result.rows.map((row) => ({ id: row.id, title: row.title, performer: row.performer }));
  }

  async editSongById(id, {
    title, year, genre, performer, duration, albumId,
  }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year, genre, performer, duration, albumId, updatedAt, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;