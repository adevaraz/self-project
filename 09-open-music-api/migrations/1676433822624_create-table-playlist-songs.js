/* eslint-disable camelcase */

const PLAYLIST_SONGS_TABLE = 'playlist_songs';

exports.up = (pgm) => {
  pgm.createTable(PLAYLIST_SONGS_TABLE, {
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
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });

  pgm.addConstraint(PLAYLIST_SONGS_TABLE, 'fk_playlist_songs.playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint(PLAYLIST_SONGS_TABLE, 'fk_playlist_songs.song.id', 'FOREIGN KEY(song_id) REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint(PLAYLIST_SONGS_TABLE, 'fk_playlist_songs.song.id');
  pgm.dropConstraint(PLAYLIST_SONGS_TABLE, 'fk_playlist_songs.playlist.id');
  pgm.dropTable(PLAYLIST_SONGS_TABLE);
};
