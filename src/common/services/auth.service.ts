import apiClient from './api-client';

const baseUrl = import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:3000';

async function login(credentials: { email: string; password: string }): Promise<{
  authToken: string;
}> {
  try {
    const result = await apiClient.post(`${baseUrl}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    return result.data;
  } catch {
    throw new Error('Login failed');
  }
}

async function refreshAccessToken(): Promise<{
  authToken: string;
}> {
  try {
    const result = await apiClient.get(`${baseUrl}/auth/refresh`, {
      withCredentials: true,
    });

    return result.data;
  } catch {
    throw new Error('Token refresh failed');
  }
}

async function logout(userId: string): Promise<void> {
  try {
    await apiClient.post(
      `${baseUrl}/auth/logout`,
      { userId },
      { withCredentials: true },
    );
  } catch {
    throw new Error('Logout failed');
  }
}

const authService = {
  login,
  refreshAccessToken,
  logout,
};

export default authService;
