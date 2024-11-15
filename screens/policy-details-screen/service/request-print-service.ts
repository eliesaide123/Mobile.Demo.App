import _shared from '../../common';
import SharedService from '../../../Shared/SharedService';
import { RequestPrintCredentials, RequestPrintResponse, SendRequest } from '../../../Shared/Types';



export async function RequestPrint(
  userId: string,
  pin: string,
  role: string,
  policyNo: string,
  url:string,
  actionCode:string,
) {
  try {
    const request:SendRequest<RequestPrintCredentials> = {request: {policyNo, actionCode }}
    const response = await SharedService.callApi<RequestPrintResponse>(
      `http://dqapi-sna.dq.com.lb:88/api${url}`,
      'POST',
      request,
      {
        'x-auth-ims-userid': userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': pin,
        'x-user-ims-role': role,
      },
    );

    console.log(response.response.error_Description);
    return response.response;
  } catch (error: any) {
    console.error('An error occurred during Request Print:', error);
  }
}
