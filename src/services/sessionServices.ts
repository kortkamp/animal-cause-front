import { api } from "./api";

interface LoginResponse {
	userId: string,
  name: string,
	avatar: { url: string } | null,
	email: string,
	roles: string[],
	token: string
}

export interface CreateUserRequest {
  name: string,
  cpf: string,
  phone: string,
  email: string,
  password: string
}


export interface UserExistsResponse {
	result: boolean
}

const signup = async (
  createUserRequest: CreateUserRequest
): Promise<LoginResponse> => {
  const response = await api.post('/v1/auth/signup', createUserRequest);

  return response.data as LoginResponse
};

const verifyEmailExists = async (email: string): Promise<UserExistsResponse> => {
    const response = await api.get(`/v1/public/users/email-exists/${email}`);

    return response.data as UserExistsResponse;
}

const verifyCpfExists = async (cpf: string): Promise<UserExistsResponse> => {
    const response = await api.get(`/v1/public/users/cpf-exists/${cpf}`);

    return response.data as UserExistsResponse;
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


export { login, signup, validateToken, verifyEmailExists, verifyCpfExists };