/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addUserAlbumLike(userId, albumId) {
    const id = `user-album-like-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3, $4, $4) RETURNING id',
      values: [id, userId, albumId, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Gagal menyukai album');
    }

    await this._cacheService.delete(`likes:${albumId}`);
  }

  async deleteUserAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Gagal batal menyukai album');
    }

    await this._cacheService.delete(`likes:${albumId}`);
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`likes:${albumId}`);
      return { dataSource: 'cache', likes: parseInt(result, 10) };
    } catch (error) {
      const query = {
        text: 'SELECT COUNT(*) FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };

      const result = await this._pool.query(query);

      await this._cacheService.set(`likes:${albumId}`, result.rows[0].count);

      return { likes: parseInt(result.rows[0].count, 10) };
    }
  }
}

module.exports = UserAlbumLikesService;
