var express = require('express');
var router = express.Router();
const Registration = require('../models/register');

// Caesar cipher encryption function
function encryptPassword(password) {
  const shift = 3; // Number of positions to shift characters
  let encryptedPassword = '';

  for (let i = 0; i < password.length; i++) {
    let charCode = password.charCodeAt(i);

    // Shift the character code by the specified number of positions
    if (charCode >= 65 && charCode <= 90) {
      // Uppercase letters (A-Z)
      charCode = ((charCode - 65 + shift) % 26) + 65;
    } else if (charCode >= 97 && charCode <= 122) {
      // Lowercase letters (a-z)
      charCode = ((charCode - 97 + shift) % 26) + 97;
    }

    encryptedPassword += String.fromCharCode(charCode);
  }

  return encryptedPassword;
}

// GET route to render the registration form
router.get('/', (req, res) => {
  res.render('register', { errorMessage: null });
});

// POST route to handle registration form submission
router.post('/', (req, res) => {
  const { email, password, role } = req.body;

  // Validate password length and special characters
  if (password.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).render('register', { errorMessage: 'Password should be at least 6 characters long and contain a special character.' });
  }

  // Check if email already exists in the database
  Registration.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).render('register', { errorMessage: 'Email is already in use.' });
      }

      // Encrypt the password using Caesar cipher
      const encryptedPassword = encryptPassword(password);

      // Save the user to the database with encrypted password and role information
      const newRegistration = new Registration({ email, password: encryptedPassword, role });

      newRegistration.save()
        .then(() => {
          res.redirect('/');
        })
        .catch((error) => {
          console.error('Error saving registration:', error);
          res.status(500).send('Internal Server Error');
        });
    })
    .catch((error) => {
      console.error('Error checking existing user:', error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
