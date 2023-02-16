/* eslint-disable camelcase */

const COLLABORATIONS_TABLE = 'collaborations';

exports.up = (pgm) => {
  pgm.createTable(COLLABORATIONS_TABLE, {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
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

  pgm.addConstraint(COLLABORATIONS_TABLE, 'fk_collaborations.playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint(COLLABORATIONS_TABLE, 'fk_collaborations.user.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint(COLLABORATIONS_TABLE, 'fk_collaborations.playlist.id');
  pgm.dropConstraint(COLLABORATIONS_TABLE, 'fk_collaborations.user.id');
  pgm.dropTable(COLLABORATIONS_TABLE);
};
