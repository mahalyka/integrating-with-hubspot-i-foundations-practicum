const axios = require('axios');
const { HUBSPOT_BASE_URL, CUSTOM_OBJECTS } = require('../../constant/global-constant');
require('dotenv').config();

const HUBSPOT_API_KEY = process.env.HS_TOKEN;
const CUSTOM_OBJECT_TYPE = CUSTOM_OBJECTS.CONTACT;

const headers = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json',
};

// Fetch all enquiry records
async function getEnquiry() {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
  const response = await axios.get(url, { headers });
  return response.data.results;
}

// Create a new enquiry record
async function createEnquiry(data) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;

  const payload = {
    properties: {
      name: data.name,
      estimated_amount: data.estimated_amount,
      enquiry_purpose: data.enquiry_purpose,
      reserved_by: data.reserved_by,
      enquiry_name: data.enquiry_name
    },
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
}

module.exports = {
  getEnquiry,
  createEnquiry,
};