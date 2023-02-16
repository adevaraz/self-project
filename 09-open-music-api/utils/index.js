/* eslint-disable camelcase */
const mapAlbumsDBToModel = ({
  id,
  name,
  year,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapSongsDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapUsersDBToModel = ({
  id,
  username,
  fullname,
  created_at,
  updated_at,
}) => ({
  id,
  username,
  fullname,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapPlaylistDBToModel = ({
  id,
  name,
  owner,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  owner,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapPlaylistSongsDBToModel = ({
  id,
  playlist_id,
  song_id,
  created_at,
  updated_at,
}) => ({
  id,
  playlistId: playlist_id,
  songId: song_id,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapPlaylistSongsListDBToModel = ({
  playlist_id,
  name,
  username,
  song_id,
  title,
  performer,
}) => ({
  playlistId: playlist_id,
  name,
  username,
  songId: song_id,
  title,
  performer,
});

module.exports = {
  mapAlbumsDBToModel,
  mapSongsDBToModel,
  mapUsersDBToModel,
  mapPlaylistDBToModel,
  mapPlaylistSongsDBToModel,
  mapPlaylistSongsListDBToModel,
};
