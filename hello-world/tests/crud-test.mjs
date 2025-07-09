import axios from 'axios';

const API_ENDPOINT = 'https://dl5p1rl8ab.execute-api.us-east-1.amazonaws.com';
const TEST_ITEM = {
  id: "test-123",
  name: "Test Book",
  price: 29.99
};

async function runTests() {
  console.log('Starting CRUD Tests...');

  try {
    console.log('\nTesting PUT /items');
    const putResponse = await axios.put(`${API_ENDPOINT}/items`, TEST_ITEM);
    console.log('PUT Response:', putResponse.data);

    console.log('\nTesting GET /items');
    const getAllResponse = await axios.get(`${API_ENDPOINT}/items`);
    console.log('GET All Response:', getAllResponse.data);

    console.log('\nTesting GET /items/{id}');
    const getOneResponse = await axios.get(`${API_ENDPOINT}/items/${TEST_ITEM.id}`);
    console.log('GET One Response:', getOneResponse.data);

    console.log('\nTesting DELETE /items/{id}');
    const deleteResponse = await axios.delete(`${API_ENDPOINT}/items/${TEST_ITEM.id}`);
    console.log('DELETE Response:', deleteResponse.data);

    console.log('\nVerifying deletion...');
    const finalGetResponse = await axios.get(`${API_ENDPOINT}/items`);
    console.log('Final GET Response:', finalGetResponse.data);

  } catch (error) {
    console.error('Test failed:', error.response?.data || error.message);
  }
}

runTests();