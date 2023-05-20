var express = require('express');
var router = express.Router();
const Personal = require('../models/personal');

/* GET home page. */
router.get('/index', function(req, res, next) {
  Personal.find()
    .then((personals) => {
      res.render('index', { personals, title: 'Express' });
    })
    .catch((error) => {
      console.error('Error retrieving personals:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
