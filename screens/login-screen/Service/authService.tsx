import axios from 'axios';

export async function login(userId: string, password: string) {
  try {
    const _data = {
      request: {
        mA_UserID: userId,
        cS_UserID: userId,
        cS_Password: password,
      },
    };

    const headers = {
      accept: 'application/json',
      'x-user-ims-lang': '0',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const response = await axios.post(
      'http://dqapi-sna.dq.com.lb:88/api/account/login',
      _data,
      {headers},
    );

    return response.data;
  } catch (error: any) {
    console.error('An error occurred during login:', error);
    return {
      success: false,
      error: error.response ? error.response.data : error.message,
    };
  }
}
