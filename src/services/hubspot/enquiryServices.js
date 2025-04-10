const axios = require('axios');
const { HUBSPOT_BASE_URL, CUSTOM_OBJECTS } = require('../../constant/global-constant');
const { formatDate, formatCurrency } = require('../../handler');
require('dotenv').config();

const HUBSPOT_API_KEY = process.env.HS_TOKEN;
const CUSTOM_OBJECT_TYPE = CUSTOM_OBJECTS.ENQUIRIES;

const headers = {
  Authorization: `Bearer ${HUBSPOT_API_KEY}`,
  'Content-Type': 'application/json',
};

// Fetch all enquiry records
async function getEnquiry() {
    const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
    
    const response = await axios.get(url, {
      headers,
      params: {
        properties: ['name', 'reserved_by', 'estimated_amount', 'enquiry_purpose'].join(','),
      },
    });

    const resp=response.data.results.map(record => ({
      id: record.id,
      ...record,
      properties: {
        ...record.properties,
        hs_createdate: formatDate(record.properties.hs_createdate),
        estimated_amount: formatCurrency(record.properties.estimated_amount), 
      },
    }));

    return resp
}

// Create a new enquiry record
async function createEnquiry(data) {
  const url = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;

  const payload = {
    properties: {
      name: data.name,
      enquiry_name: data.name, // Mandatory field, accidentally created in the first place
      estimated_amount: data.estimated_amount,
      enquiry_purpose: data.enquiry_purpose,
      reserved_by: data.reserved_by
    },
  };

  const response = await axios.post(url, payload, { headers });
  const enquiryId = response.data.id;

  if (data.contact_id) {
    const associationUrl = `${HUBSPOT_BASE_URL}/crm/v3/objects/${CUSTOM_OBJECT_TYPE}/${enquiryId}/associations/contacts/${data.contact_id}/customer`;

    await axios.put(associationUrl, {}, { headers });
  }

  return response.data;
}

async function getReservedByOptions() {
    const url = `${HUBSPOT_BASE_URL}/crm/v3/properties/${CUSTOM_OBJECT_TYPE}/reserved_by`;
    const response = await axios.get(url, { headers });
  
    // This returns array of { label, value }
    return response.data.options;
  }

module.exports = {
  getEnquiry,
  createEnquiry,
  getReservedByOptions
};