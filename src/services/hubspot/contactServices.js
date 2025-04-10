const axios = require('axios');
const { HUBSPOT_BASE_URL, CUSTOM_OBJECTS } = require('../../constant/global-constant');
const { formatDate } = require('../../handler');
require('dotenv').config();

const HUBSPOT_API_KEY = process.env.HS_TOKEN;
const CUSTOM_OBJECT_TYPE = CUSTOM_OBJECTS.CONTACT;

const headers = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json',
};

// Fetch all contact records
async function getContact() {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    
  const response = await axios.get(url, {
    headers,
    params: {
      properties: ['fullname', 'email', 'phone', 'address'].join(','),
    },
  });

  const resp=response.data.results.map(record => ({
    id: record.id,
    ...record,
    properties: {
      ...record.properties,
      hs_createdate: formatDate(record.properties.hs_createdate),
    },
  }));

console.log(resp)
  return resp
}

// Create a new contact record
async function createContact(data) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;

  const payload = {
    properties: {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address
    },
  };

  const response = await axios.post(url, payload, { headers });
  return response.data;
}

module.exports = {
  getContact,
  createContact,
};