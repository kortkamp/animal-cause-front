import { api } from "./api";


interface LoginResponse {
	userId: string,
	email: string,
	roles: string[],
	token: string
}

interface RefreshTokenResponse {
  token: string;
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return api.post('/sessions', { email, password });
};

const refreshToken = async (token: string) => {
  const response = await api.post('/sessions',
   {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data as RefreshTokenResponse;
};

export { login, refreshToken };