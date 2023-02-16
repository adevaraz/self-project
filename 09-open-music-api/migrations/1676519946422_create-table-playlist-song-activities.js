/* eslint-disable camelcase */

const PLAYLIST_SONG_ACTIVITIES_TABLE = 'playlist_song_activities';

exports.up = (pgm) => {
  pgm.createTable(PLAYLIST_SONG_ACTIVITIES_TABLE, {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    action: {
      type: 'TEXT',
      notNull: true,
    },
    time: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(PLAYLIST_SONG_ACTIVITIES_TABLE, 'fk_playlist_song_activities.playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint(PLAYLIST_SONG_ACTIVITIES_TABLE, 'fk_collaborations.playlist.id');
  pgm.dropTable(PLAYLIST_SONG_ACTIVITIES_TABLE);
};
