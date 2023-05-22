const express = require('express');
const router = express.Router();
const Registration = require('../models/register');

// GET route to retrieve all registered users
router.get('/', (req, res) => {
  Registration.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
