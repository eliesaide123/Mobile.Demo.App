import axios from 'axios';
import _shared from '../../common';

export async function fetchRoleAndPin(userId: string) {
  try {
    const headers = {
      'accept': 'application/json',
      'x-auth-ims-userid': userId,
      'x-auth-ims-uitoken': _shared.ui_token,
      'x-user-ims-lang': '0',
      'X-Requested-With': 'XMLHttpRequest',
    };

    const response = await axios.get(
      'http://dqapi-sna.dq.com.lb:88/api/csconnect',
      { headers }
    );

    const { user_Role: role, user_Pin: pin } = response.data.response;
    return { role, pin };
  } catch (error: any) {
    console.error('An error occurred while fetching role and pin:', error);
    return { role: '', pin: '' };
  }
}

export async function getAgentSearchOptions(userId: string) {
  try {
    // Step 1: Retrieve role and pin
    const { role, pin } = await fetchRoleAndPin(userId);

    if (!role || !pin) {
      console.error('Role or PIN is missing.');
      return [];
    }

    // Step 2: Use role and pin to fetch agent search options
    const headers = {
      'x-auth-ims-userid': userId,
      'x-auth-ims-uitoken': _shared.ui_token,
      'x-user-ims-role': role,
      'x-user-ims-pin': pin,
      'x-user-ims-lang': '0',
      'accept': 'application/json',
    };

    const response = await axios.get(
      'http://dqapi-sna.dq.com.lb:88/api/agent/clients/options',
      { headers }
    );

    return response.data.response.agentOptionsData.agentEntities || [];
  } catch (error: any) {
    console.error('An error occurred while fetching agent search options:', error);
    return [];
  }
}

export async function PerformSearch(userId: string, role: string, pin: string, searchParams: any) {
  try {
    console.log(searchParams)
    const headers = {
      'x-auth-ims-userid': userId,
      'x-auth-ims-uitoken': _shared.ui_token,
      'x-user-ims-role': role,
      'x-user-ims-pin': pin,
      'x-user-ims-lang': '0',
      'accept': 'application/json',
    };

    console.log("Testtttt: " , headers)

    // Here, `searchParams` now includes the `SearchType` and its corresponding search terms.
    const response = await axios.get(
      'http://dqapi-sna.dq.com.lb:88/api/agent/clients',
      {
        headers,
        params: searchParams,
      }
    );
    console.log("Response: " , response.data.response.agentClientsData.agentClients)
    return response.data.response.agentClientsData.agentClients || [];
  } catch (error: any) {
    console.error('An error occurred while performing search:', error);
    return [];
  }
}
