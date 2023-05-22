var express = require('express');
var router = express.Router();
const Registration = require('../models/register');

// GET route to render the registration form
router.get('/', (req, res) => {
  res.render('register');
});

// POST route to handle registration form submission
router.post('/', (req, res) => {
  const { email, password, role } = req.body;

  // Save the user to the database with role information
  const newRegistration = new Registration({ email, password, role });

  newRegistration.save()
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.error('Error saving registration:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
