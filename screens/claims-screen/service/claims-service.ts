import {
  LoginCredentials,
  LoginResponse,
  SendRequest,
} from '../../../Shared/Types';
import SharedService from '../../../Shared/SharedService';
import _shared from '../../common';

export async function GetClaims(PolicyNo: string, OS_Only: boolean) {
  try {
    console.log(PolicyNo)
    console.log(OS_Only)
    console.log( _shared.userId)
    console.log(_shared.ui_token)
    console.log(_shared.pin)
    console.log(_shared.role)
    const queryParams = `?PolicyNo=${PolicyNo}&OS_Only=${OS_Only}`;
    const response = await SharedService.callApi(
      `/claim${queryParams}`,
      'GET',
      {
        'x-auth-ims-userid': _shared.userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': _shared.pin,
        'x-user-ims-role': _shared.role,
      },
    );
    console.log('responseClaims: ' + response);
    return response;
  } catch (error: any) {}
}
