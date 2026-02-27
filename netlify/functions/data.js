const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  const store = getStore('bayan-data');
  
  if (event.httpMethod === 'GET') {
    const payload = await store.get('payload', { type: 'json' });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {})
    };
  }

  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body);
      await store.setJSON('payload', body.payload);
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ success: true })
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
