const express = require('express');
const receiveContactMessage = require('../utils/reciveContactMessage');

const router = express.Router();

router.post('/contact', async (req, res) => {
  const contactData = req.body;
  try {
    await receiveContactMessage(contactData);
    res.status(200).send({ message: 'Contact message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
