require('dotenv').config();

const HUBSPOT_BASE_URL = process.env.HUBSPOT_BASE_URL

module.exports = {
    HUBSPOT_BASE_URL,
    CUSTOM_OBJECTS: {
        ENQUIRIES: 'enquiries',
        CONTACT: 'contacts'
    },
    PAGE_TITLE: 'Update Enquiry Form | Integrating With HubSpot I Practicum',
    HOME_TITLE: 'Enquiry List | Integrating With HubSpot I Practicum',
    PAGE_CONTACT_TITLE: 'Update Enquiry Form | Integrating With HubSpot I Practicum',
    HOME_CONTACT_TITLE: 'Enquiry List | Integrating With HubSpot I Practicum',
  };