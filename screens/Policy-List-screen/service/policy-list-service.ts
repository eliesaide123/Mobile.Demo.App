import axios from 'axios';
import _shared from '../../common';

export async function PolicyListService(pin:any, role :any, groupCode:any) {
    try {        
        const response = await axios.get(`http://dqapi-sna.dq.com.lb:88/api/policy?ProductGroup=${groupCode}`, {
            headers: {
                'accept': 'application/json',
                'x-auth-ims-userid': 'r-travel',
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
