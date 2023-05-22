const express = require('express');
const router = express.Router();
const Personal = require('../models/personal');

router.get('/', function(req, res, next) {
  Personal.find()
    .then((personals) => {
      res.render('user-dashboard', { personals: personals, title: 'Express' });
    })
    .catch((error) => {
      console.error('Error retrieving personals:', error);
      res.status(500).send('Internal Server Error');
    });
});


module.exports = router;
