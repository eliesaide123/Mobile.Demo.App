export interface LoginResponse {
  success: boolean;
  data?: any;
  error?: any;
}

export async function login(userId: string, password: string): Promise<LoginResponse> {
  try {
      console.log("Initiating login request...");
      
      const response = await fetch('http://dqapi-sna.dq.com.lb:88/api/account/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'x-user-ims-lang': '0'
          },
          body: JSON.stringify({
              request: {
                  MA_UserID: userId,
                  CS_UserID: userId,
                  CS_Password: password
              }
          })
      });

      const result = await response.json();
      
      if (response.ok) {
          console.log("Login successful:", result);
          return { success: true, data: result };
      } else {
          console.error("Login failed:", result);
          return { success: false, error: result };
      }
  } catch (error) {
      console.error("An error occurred during login:", error);
      return { success: false, error };
  }
}
