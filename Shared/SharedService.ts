import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosHeaders } from 'axios';


const api: AxiosInstance = axios.create({
    baseURL: 'http://dqapi-sna.dq.com.lb:88/api/',
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-user-ims-lang': '0'
    }
});

async function request<T>(config: AxiosRequestConfig) {
    try {
        const response: AxiosResponse<T> = await api.request<T>(config);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error(`API error:`, error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
}

const SharedService = {
    get: function <T>(url: string) {
        return request<T>({ method: 'GET', url});
    },

    post: function <T>(url: string, data?: any) {
        return request<T>({ method: 'POST', url, data: JSON.stringify(data)});
    },

    put: function <T>(url: string, data?: any) {
        return request<T>({ method: 'PUT', url, data: JSON.stringify(data) });
    },

    delete: function <T>(url: string) {
        return request<T>({ method: 'DELETE', url });
    },
};

export default SharedService;
