import { api } from "./api";

interface LoginResponse {
	userId: string,
  name: string,
	avatar: null,
	email: string,
	roles: string[],
	token: string
}

const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  return (await api.post('/v1/auth/signin', { email, password })).data as LoginResponse;
};

const validateToken = async (
  token: string,
): Promise<LoginResponse> => {
  return (await api.post('/v1/auth/validate', { token})).data as LoginResponse;
};


export { login, validateToken };