const pg = require("pg");

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const config = {
  user: 'postgres',
  password: 'postgres',
  database: 'tutorial',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction,
});

pool.on('connect', () => {
  console.log('Connected to Postgres');
});

const createTables = () => {
  const imageTable = `CREATE TABLE IF NOT EXISTS
  images(
    id SERIAL PRIMARY KEY,
    title VARCHAR(128) NOT NULL,
    cloudinary_id VARCHAR(128) NOT NULL,
    image_url VARCHAR(128) NOT NULL
  )`;

  pool
    .query(imageTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end()
    })
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
})

module.exports = {
  createTables,
  pool,
}

require('make-runnable');