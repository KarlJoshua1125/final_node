const express = require('express');
const router = express.Router();
const Personal = require('../models/personal');

// GET route to render the edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const user = await Personal.findById(req.params.id);
    res.render('edit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to update the user
router.post('/edit/:id', async (req, res) => {
  try {
    await Personal.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/personal');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// POST route to delete the user
router.post('/delete/:id', async (req, res) => {
  try {
    await Personal.findByIdAndDelete(req.params.id);
    res.redirect('/index');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
