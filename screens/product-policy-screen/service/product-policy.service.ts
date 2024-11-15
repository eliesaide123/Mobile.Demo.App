import axios from 'axios';
import _shared from '../../common';

export async function ProductPolicyService(userId: string) {
    try {    
        const response = await axios.get("http://dqapi-sna.dq.com.lb:88/api/csconnect", {
            headers: {
                'accept': 'application/json',
                'x-auth-ims-userid': userId,
                'x-auth-ims-uitoken': _shared.ui_token,
                'x-user-ims-lang': '0',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });                           
        return response.data.response;
    } catch (error: any) {
    }
}
