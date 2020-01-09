const express = require('express');
const router = express.Router();
const data = require('../lib/chat-sentiment');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Sentimentality over time',
    data
  });
});

module.exports = router;
