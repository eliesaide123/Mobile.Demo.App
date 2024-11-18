import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse {
  response?: {
    error_Description?: string;
    details?: string;
    status:boolean
  };
}

const BASE_URL = 'http://dqapi-sna.dq.com.lb:88/api';

const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-user-ims-lang': '0',
  'X-Requested-With': 'XMLHttpRequest',
};

let setAlert: any = () => {}; // Placeholder for alert setter function

const SharedService = {
  // Set the alert handler function (so we can trigger alerts globally)
  setAlertHandler: (handler: any) => {
    setAlert = handler;
  },

  // Show an alert with a message
  showAlert: (message: string) => {
    if (setAlert) {
      setAlert(message);
    }
  },

  // Generic API call method
  async callApi<T extends ApiResponse>(
    endpoint: string,
    method: 'GET' | 'POST' = 'GET',
    data: any = null,
    extraHeaders: object = {}
  ) {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const headers = { ...defaultHeaders, ...extraHeaders };
      const config: AxiosRequestConfig = {
        method,
        url,
        headers,
        data,
      };

      const response: AxiosResponse<T> = await axios(config);
      if (response && response.data?.response?.status == false) {
        SharedService.showAlert(response.data?.response?.error_Description || "An error occurred.");
      }else if(response && response.data?.response?.status) {
        return response.data;
      }

      
    } catch (error: any) {
      // Check if the error contains a response or just the message
      const errorDetails = error.response ? error.response.data.error.details : error.message;
      SharedService.showAlert(errorDetails);

      throw new Error(errorDetails);
    }
  },
};

export default SharedService;
