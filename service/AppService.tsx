import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://dqapi-sna.dq.com.lb:88/api/',
  headers: { 'x-user-ims-lang': '0' }
});

const AppService = {
  postRequest: async (url :string, data = {}, headers = {}) => {
    try {
      const response = await axiosInstance.post(url, data, { headers });
      return response.data;
    } catch (error) {
      console.error('Error in postRequest:', error);
      throw error; 
    }
  }
};

export default AppService;
