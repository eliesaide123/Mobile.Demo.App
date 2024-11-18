import {LoginCredentials, LoginResponse, SendRequest} from '../../../Shared/Types';
import SharedService from '../../../Shared/SharedService';
<<<<<<< HEAD
 
=======

>>>>>>> d648165c5db609dd658dfe6abea8091d74a1d2b3
export async function login(credentials: LoginCredentials) {
  try {
    const request:SendRequest<LoginCredentials> = {request: credentials}
    const response = await SharedService.callApi<LoginResponse>('/account/login', 'POST', request);    
    return response;
  } catch (error: any) {
  }
}
 
 