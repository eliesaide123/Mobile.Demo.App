import {LoginCredentials, LoginResponse, SendRequest} from '../../../Shared/Types';
import SharedService from '../../../Shared/SharedService';

export async function login(credentials: LoginCredentials) {
  try {
    const request:SendRequest<LoginCredentials> = {request: credentials}
    const response = await SharedService.callApi<LoginResponse>('/account/login', 'POST', request);    
    return response;
  } catch (error: any) {
    return {
      status: false,
      response: error.response ? error.response.data : error.message,
    };
  }
}
