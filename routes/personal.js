const express = require('express');
const router = express.Router();
const Personal = require('../models/personal');

router.post('/update/:id', async (req, res) => {
  try {
    const updatedData = req.body;
    await Personal.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect('/index');
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
