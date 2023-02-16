/* eslint-disable camelcase */

const SONGS_TABLE = 'songs';

exports.up = (pgm) => {
  pgm.addConstraint(SONGS_TABLE, 'fk_songs.album.id', 'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint(SONGS_TABLE, 'fk_songs.album.id');
};
