/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const InvariantError = require('../exceptions/InvariantError');
const AuthenticationError = require('../exceptions/AuthenticationError');
const NotFoundError = require('../exceptions/NotFoundError');
const { mapUsersDBToModel } = require('../../utils');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $5) RETURNING id',
      values: [id, username, hashedPassword, fullname, createdAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    return id;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname, created_at, updated_at FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return result.rows.map(mapUsersDBToModel)[0];
  }
}

module.exports = UsersService;