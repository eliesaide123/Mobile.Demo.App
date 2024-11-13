import axios from 'axios';
import _shared from '../../common';

export async function GetGenRisk(userId: string, policyNo: string, pin: string, role: string, riskNo:number, coversURL: string, policyDataURI: string) {
    try {                     
        const response = await axios.get(`http://dqapi-sna.dq.com.lb:88/api/policy${policyDataURI}?policyNo=${policyNo}&riskNo=${riskNo}`, {
            headers: {
                'accept': 'application/json',
                'x-auth-ims-userid': userId,
                'x-auth-ims-uitoken': _shared.ui_token,
                'x-user-ims-pin': pin,
                'x-user-ims-role': role,
                'x-user-ims-lang': '0',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });        
        
        return response.data.response;
    } catch (error: any) {
        console.error("An error occurred during CS_Connect:", error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
}

export async function GetGenRiskCovers(userId: string, policyNo: string, pin: string, role: string, riskNo:number, coversURL: string, policyDataURI: string) {
    try {                     
        const response = await axios.get(`http://dqapi-sna.dq.com.lb:88/api/policy${coversURL}?policyNo=${policyNo}&riskNo=${riskNo}`, {
            headers: {
                'accept': 'application/json',
                'x-auth-ims-userid': userId,
                'x-auth-ims-uitoken': _shared.ui_token,
                'x-user-ims-pin': pin,
                'x-user-ims-role': role,
                'x-user-ims-lang': '0',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });        
        
        console.log("ssadasd: " , response.data.response)
        return response.data.response;
    } catch (error: any) {
        console.error("An error occurred during CS_Connect:", error);
        return { success: false, error: error.response ? error.response.data : error.message };
    }
}