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

// Validate contact
async function getContactByEmail(email) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}/search`;

  const body = {
    filterGroups: [
      {
        filters: [
          {
            propertyName: 'email',
            operator: 'EQ',
            value: email,
          },
        ],
      },
    ],
    properties: ['firstname', 'lastname', 'email', 'phone', 'address'],
    limit: 1,
  };

  const response = await axios.post(url, body, { headers });
  return response.data.results?.[0] || null;
}

// Fetch all contact records
async function getContact() {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    
  const response = await axios.get(url, {
    headers,
    params: {
      properties: ['firstname', 'lastname', 'email', 'phone', 'address'].join(','),
    },
  });

  const resp=response.data.results.map(record => ({
    id: record.id,
    ...record,
    properties: {
      ...record.properties,
      fullname: `${record.properties.firstname} ${record.properties.lastname}`,
      hs_createdate: formatDate(record.properties.hs_createdate),
    },
  }));

  return resp
}

// Update function
async function updateContact(contactId, data) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}/${contactId}`;
  return await axios.patch(url, {
    properties: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  }, { headers });
}

// Create function
async function createContact(data) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
  return await axios.post(url, {
    properties: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      address: data.address,
    },
  }, { headers });
}


// Create a new contact record
async function updateOrCreateContact(data) {
  const existing = await getContactByEmail(data.email);

  if (existing) {
    return await updateContact(existing.id, data);
  } else {
    return await createContact(data);
  }
}

module.exports = {
  getContact,
  updateOrCreateContact
};