/* eslint-disable camelcase */

const AUTHENTICATIONS_TABLE = 'authentications';

exports.up = (pgm) => {
  pgm.createTable(AUTHENTICATIONS_TABLE, {
    token: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable(AUTHENTICATIONS_TABLE);
};
