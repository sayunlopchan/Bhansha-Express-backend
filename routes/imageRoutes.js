const express = require('express');
const multer = require('multer');
const Image = require('../models/Image');

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  console.log(req.file); // Debugging: log the uploaded file

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const newImage = new Image({
      name: req.file.originalname,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newImage.save();
    res.status(201).json({ message: 'Image uploaded successfully!', id: newImage._id });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Route to serve image by ID
router.get('/image/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ message: 'Image not found' });

    res.set('Content-Type', image.img.contentType);
    res.send(image.img.data);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to retrieve image' });
  }
});

module.exports = router;
