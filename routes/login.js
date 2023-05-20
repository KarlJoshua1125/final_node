var express = require('express');
var router = express.Router();
const Registration = require('../models/register');

// GET route to render the login form
router.get('/', (req, res) => {
  res.render('login', { errorMessage: null });
});

// POST route to handle login form submission
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database and validate the password
  Registration.findOne({ email })
    .then((registration) => {
      if (!registration) {
        // User is not registered
        return res.render('login', { errorMessage: 'User not registered' });
      }

      // Validate the password
      if (password !== registration.password) {
        // Invalid password
        return res.render('login', { errorMessage: 'Invalid password' });
      }

      // User is registered and password is valid, redirect to dashboard
      res.redirect('/personal');
    })
    .catch((error) => {
      console.error('Error finding registration:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
