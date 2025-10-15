import fetch from 'node-fetch';

interface ApiResponse {
  message: string;
}

async function testServer() {
  try {
    // Test API endpoint
    const apiResponse = await fetch('http://localhost:3000/api');
    const apiData = await apiResponse.json() as ApiResponse;
    console.log('API Test:', apiData.message === 'Server is running' ? '✅ Passed' : '❌ Failed');
    console.log('API Response:', apiData);

    // Test frontend
    const frontendResponse = await fetch('http://localhost:3000');
    const status = frontendResponse.status;
    console.log('Frontend Test:', status === 200 ? '✅ Passed' : '❌ Failed');
    console.log('Frontend Status:', status);

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testServer();