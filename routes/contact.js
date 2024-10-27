const express = require('express');
const { reciveContactMessage } = require('../utils/sendEmail');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const contactData = req.body;
  try {
    await reciveContactMessage(contactData);
    res.status(200).send({ message: 'Contact message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
