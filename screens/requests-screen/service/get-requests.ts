import _shared from '../../common';
import SharedService from '../../../Shared/SharedService';
import { GetRequestsResponse } from '../../../Shared/Types';



export async function GetRequests(
  userId: string,
  pin: string,
  role: string,
  policyNo: string,
) {
  try {
    const url = `/request${policyNo ? `?policyNo=${policyNo}` : ''}`
    const response = await SharedService.callApi<GetRequestsResponse>(
      `${url}`,
      'GET',
      {},
      {
        'x-auth-ims-userid': userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': pin,
        'x-user-ims-role': role,
      },
    );
    return response?.response;
  } catch (error: any) {
  }
}
