const express = require('express');
const router = express.Router();
const { createContact, getContact } = require('../services/hubspot/contactServices');
const { PAGE_CONTACT_TITLE, HOME_CONTACT_TITLE } = require('../constant/global-constant');

// Homepage: list all contact
router.get('/', async (req, res) => {
  try {
    const records = await getContact();
    res.render('contact', {
      title: HOME_CONTACT_TITLE,
      records,
    });
  } catch (error) {
    console.log(error)
    res.status(500).send('Error fetching records');
  }
});

// Form page
router.get('/update-contact', async (req, res) => {
  try {
    res.render('updates', {
      title: PAGE_CONTACT_TITLE
    });
  } catch (error) {
    res.status(500).send('Failed to load form');
  }
});

// Form submission: create a new contact
router.post('/process-update-contact', async (req, res) => {
  try {
    await createContact(req.body);
    res.redirect('/');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating record');
  }
});

module.exports = router;