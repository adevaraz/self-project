/* eslint-disable camelcase */

const PLAYLISTS_TABLE = 'playlists';

exports.up = (pgm) => {
  pgm.createTable(PLAYLISTS_TABLE, {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    owner: {
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

  pgm.addConstraint(PLAYLISTS_TABLE, 'fk_playlists.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint(PLAYLISTS_TABLE, 'fk_playlists.owner_users.id');
  pgm.dropTable(PLAYLISTS_TABLE);
};
