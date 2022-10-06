const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const db = require('../services/dbConnect');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get('/status', (req, res) => {
  res.json({ message: 'OK!' });
})

// image upload
router.post('/images', (req, res) => {
  const data = {
    title: req.body.title,
    image: req.body.image,
  }
  
  // upload to cloudinary
  cloudinary.uploader.upload(data.image)
  .then((image) => {
    db.pool.connect((err, client) => {
      const statement = {
        name: 'insert image',
        text: 'INSERT INTO images (title, cloudinary_id, image_url) VALUES ($1, $2, $3) RETURNING *',
        values: [data.title, image.public_id, image.secure_url]
      }

      // execute query
      client
      .query(statement)
      .then((result) => {
        result = result.rows[0];

        // send success response
        res.status(201).send({
          status: "success",
          data: {
            message: "image uploaded successfully",
            title: result.title,
            cloudinary_id: result.cloudinary_id,
            image_url: result.image_url,
          },
        })
      }).catch((e) => {
        res.status(500).send({
          message: "failed to upload image",
          e,
        });
      })
    })
  })
  .catch((error) => {
    res.status(500).send({
      message: "failed to upload image",
      error,
    })
  })
});

// retrieve image
router.get("/images/:cloudinary_id", (req, res) => {
  const { cloudinary_id } = req.params;

  db.pool.connect((err, client) => {
    const query = 'SELECT * FROM images WHERE cloudinary_id = $1';
    const value = [cloudinary_id];

    client
    .query(query, value)
    .then((output) => {
      res.status(200).send({
        status: 'successfully retrieve',
        data: {
          id: output.rows[0].cloudinary_id,
          title: output.rows[0].title,
          url: output.rows[0].image_url,
        }
      })
    })
    .catch((error) => {
      res.status(401).send({
        status: 'failed to retrieve image',
        data: {
          message: 'could not retrieve',
          error,
        }
      })
    })
  })
});

// delete image
router.delete("/images/:cloudinary_id", (req, res) => {
  const { cloudinary_id } = req.params;

  cloudinary.uploader
    .destroy(cloudinary_id)
    .then(() => {
      db.pool.connect((err, client) => {
        const query = 'DELETE FROM images WHERE cloudinary_id = $1';
        const value = [cloudinary_id];
    
        client
        .query(query, value)
        .then((deleteRes) => {
          res.status(200).send({
            message: 'successfully deleted'
          })
        })
        .catch((error) => {
          res.status(500).send({
            message: 'failed to delete image',
            e,
          })
        })
      })
    })
    .catch((error) => {
      res.status(500).send({
        message: 'failed to delete image',
        e,
      })
    })
});

// update image
router.put('/images/:cloudinary_id', (req, res) => {
  const { cloudinary_id } = req.params;

  const data = {
    title: req.body.title,
    image: req.body.image,
  }

  cloudinary.uploader
    .destroy(cloudinary_id)
    .then(() => {
      cloudinary.uploader
        .upload(data.image)
        .then((result) => {
          db.pool.connect((err, client) => {
            const query = 'UPDATE images SET title = $1, cloudinary_id = $2, image_url = $3 WHERE cloudinary_id = $4';
            const value = [
              data.title,
              result.public_id,
              result.secure_url,
              cloudinary_id
            ];

            client
            .query(query, value)
            .then(() => {
              res.status(201).send({
                status: 'success',
                data: {
                  message: 'successfully updated'
                }
              })
            })
            .catch((error) => {
              res.status(500).send({
                message: 'failed to update',
                error,
              })
            })
          })
        })
    })
    .catch((error) => {
      res.status(500).send({
        message: 'failed to update',
        error
      })
    })
});

module.exports = router;