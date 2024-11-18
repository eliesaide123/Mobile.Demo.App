import _shared from '../../common';
import SharedService from '../../../Shared/SharedService';
import { GetDetailsBeneficiaryResponse, GetDetailsLegalAddressResponse } from '../../../Shared/Types';

export async function GetDetails(
  userId: string,
  pin: string,
  role: string,
  policyNo: string,
  url: string,
) {
  try {
    console.log(url)
    const response = await SharedService.callApi<GetDetailsLegalAddressResponse | GetDetailsBeneficiaryResponse>(
      `${url}?policyNo=${policyNo}`,
      'GET',
      {},
      {
        'x-auth-ims-userid': userId,
        'x-auth-ims-uitoken': _shared.ui_token,
        'x-user-ims-pin': pin,
        'x-user-ims-role': role,
      },
    );

    return response;
  } catch (error: any) {
    console.error('An error occurred during Request Print:', error);
  }
}
