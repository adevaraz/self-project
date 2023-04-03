/* eslint-disable camelcase */

const USER_ALBUM_LIKES_TABLE = 'user_album_likes';

exports.up = (pgm) => {
  pgm.createTable(USER_ALBUM_LIKES_TABLE, {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(USER_ALBUM_LIKES_TABLE, 'fk_user_album_likes.user.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
  pgm.addConstraint(USER_ALBUM_LIKES_TABLE, 'fk_user_album_likes.album.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
  pgm.addConstraint(USER_ALBUM_LIKES_TABLE, 'user_album_unique', {
    unique: ['user_id', 'album_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropConstraint(USER_ALBUM_LIKES_TABLE, 'user_album_unique');
  pgm.dropConstraint(USER_ALBUM_LIKES_TABLE, 'fk_user_album_likes.album.id');
  pgm.dropConstraint(USER_ALBUM_LIKES_TABLE, 'fk_user_album_likes.user.id');
  pgm.dropTable(USER_ALBUM_LIKES_TABLE);
};
