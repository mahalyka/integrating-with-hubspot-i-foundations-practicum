const express = require('express');
const router = express.Router();
const { getReservedByOptions, createEnquiry, getEnquiry } = require('../services/hubspot/enquiryServices');
const { PAGE_TITLE, HOME_TITLE } = require('../constant/global-constant');

// Homepage: list all custom objects
router.get('/', async (req, res) => {
  try {
    const records = await getEnquiry();
    res.render('homepage', {
      title: HOME_TITLE,
      records,
    });
  } catch (error) {
    res.status(500).send('Error fetching records');
  }
});

// Form page
router.get('/update-enquiry', async (req, res) => {
  try {
    const reservedByOptions = await getReservedByOptions();
    res.render('updates', {
      title: PAGE_TITLE,
      reservedByOptions,
    });
  } catch (error) {
    console.error('Failed to load reserved by options:', error?.response?.data || error.message);
    res.status(500).send('Failed to load form');
  }
});

// Form submission: create a new custom object
router.post('/process-update-enquiry', async (req, res) => {
  try {
    await createEnquiry(req.body);
    res.redirect('/');
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating record');
  }
});

module.exports = router;