import axios from 'axios';
import SharedService from '../../../Shared/SharedService';

export interface LoginResponse {
    success: boolean;
    data?: any;
    error?: any;
}

export async function login(userId: string, password: string): Promise<LoginResponse> {
    try {
        console.log("Initiating login request...");

        const _data = {
          request: {
            mA_UserID: userId,
            cS_UserID: userId,
            cS_Password: password
          }
        }
        
        const response = await SharedService.post("/account/login", _data)

        console.log("Login successful:", response.data);
        return { success: true, data: response.data };
    } catch (error : any) {
        console.error("An error occurred during login:", error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
}
