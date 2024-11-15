import _shared from '../../common';
import SharedService from '../../../Shared/SharedService';

export async function GetDetails(
  userId: string,
  pin: string,
  role: string,
  policyNo: string,
  url: string,
) {
  try {
    const response = await SharedService.callApi(
      `http://dqapi-sna.dq.com.lb:88/api${url}?policyNo=${policyNo}`,
      'GET',
      {},
      {
        'x-auth-ims-userid': userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': pin,
        'x-user-ims-role': role,
      },
    );

    console.log(response?.response);
    return response.response;
  } catch (error: any) {
    console.error('An error occurred during Request Print:', error);
  }
}
