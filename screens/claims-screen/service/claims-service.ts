import {
  LoginCredentials,
  LoginResponse,
  SendRequest,
} from '../../../Shared/Types';
import SharedService from '../../../Shared/SharedService';
import _shared from '../../common';

export async function GetClaims(PolicyNo: string, OS_Only: boolean) {
  try {
    const queryParams = `?PolicyNo=${PolicyNo}&OS_Only=${OS_Only}`;

    console.log("queryParams: ", queryParams)
    const response = await SharedService.callApi(
      `/claim${queryParams}`,
      'GET',
      {},
      {
        'x-auth-ims-userid': _shared.userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': _shared.pin,
        'x-user-ims-role': _shared.role,
      },
    );
    console.log('responseClaims: ' + JSON.stringify(response));
    return response;
  } catch (error: any) {}
}