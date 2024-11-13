import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL
const BASE_URL = 'http://dqapi-sna.dq.com.lb:88/api';

// Default headers
const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-user-ims-lang': '0',
  'X-Requested-With': 'XMLHttpRequest'
};

// Generic SharedService with response type
const SharedService = {
  // This method will accept a generic type `T` representing the response data structure
  async callApi<T>(endpoint: string, method: 'GET' | 'POST' = 'GET', data: any = null, extraHeaders: object = {}): Promise<T> {
    try {
      // Create full URL
      const url = `${BASE_URL}${endpoint}`;

      // Merge default headers with any extra headers
      const headers = { ...defaultHeaders, ...extraHeaders };

      // Configure request
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        data
      };

      // Make the request
      const response: AxiosResponse<T> = await axios(config);

      // Return the relevant part of the response
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }
};

export default SharedService;
