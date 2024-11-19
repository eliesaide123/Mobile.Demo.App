  import SharedService from '../../../Shared/SharedService';
import { ClaimSettle, MainResponse, SendRequest, SettleClaimsCredentials } from '../../../Shared/Types';
  import _shared from '../../common';
  
  export async function GetClaimsSettle(PolicyNo: string, IMSClaimNo: string, SettleAction: string) {
    try {
      const queryParams = `?PolicyNo=${PolicyNo}&IMSClaimNo=${IMSClaimNo}&SettleAction=${SettleAction}`;
      const response = await SharedService.callApi(
        `/claim/settle/options${queryParams}`,
        'GET',
        {},
        {
          'x-auth-ims-userid': _shared.userId,
          'x-auth-ims-uitoken': _shared.ui_token,
          'x-user-ims-pin': _shared.pin,
          'x-user-ims-role': _shared.role,
        },
      );
      return response;
    } catch (error: any) {}
  }

  export async function SettleClaim(credentials:ClaimSettle) {
    try{
      const request :SendRequest<SettleClaimsCredentials> = {request:{claimSettleData:{claimSettle:[credentials]}}}
      const response = await SharedService.callApi(
        `/claim/settle`,
        'POST',
        request,
        {
          'x-auth-ims-userid': _shared.userId,
          'x-auth-ims-uitoken': _shared.ui_token,
          'x-user-ims-pin': _shared.pin,
          'x-user-ims-role': _shared.role,
        },
      );
      return response?.response;
    }catch(error:any){}

  }