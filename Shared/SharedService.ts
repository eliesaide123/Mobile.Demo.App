// SharedService.js
import axios from 'axios';

// Base URL
const BASE_URL = 'http://dqapi-sna.dq.com.lb:88/api';

// Default headers
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-user-ims-lang': '0',
  'X-Requested-With': 'XMLHttpRequest'
};

// Function to call API with dynamic endpoint and optional extra headers
const SharedService = {
  async callApi(endpoint: string, method = 'GET', data = null, extraHeaders = {}) {
    try {
      // Create full URL
      const url = `${BASE_URL}${endpoint}`;

      // Merge default headers with any extra headers
      const headers = { ...defaultHeaders, ...extraHeaders };

      // Configure request
      const config = {
        method,
        url,
        headers,
        data
      };

      // Make the request
      const response = await axios(config);

      // Return the relevant part of the response
      return response.data.response;

    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }
};

export default SharedService;
