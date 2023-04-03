/* eslint-disable camelcase */

const ALBUMS_TABLE = 'albums';

exports.up = (pgm) => {
  pgm.addColumns(ALBUMS_TABLE, {
    cover_url: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns(ALBUMS_TABLE, ['cover_url']);
};
