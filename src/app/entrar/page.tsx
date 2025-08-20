'use client';

import { AppInput } from '@/components/AppInput';
import { HttpError } from '@/services/httpError';
import { login } from '@/services/sessionServices';
import { useAppStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

const Login = () => {

  const searchParams = useSearchParams()

  const [message, setMessage] = useState('');

  const [isFetching, setIsFetching] = useState(false);

  const [state, dispatch] = useAppStore();

  useEffect(() => {
    const logout = searchParams.get('logout')

    if (logout) {
      dispatch({ type: 'LOG_OUT' })
    } else if (state.isAuthenticated) {
      const redirectPath = searchParams.get('redirect')
      redirect(redirectPath ? redirectPath : '/');
    }
  }, [dispatch, searchParams, state.isAuthenticated])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [email, password] = e.target as unknown as { value: string }[];

    let loginSuccess = false;
    setIsFetching(true);
    try {
      const loginData = await login(email.value, password.value);
      dispatch({
        type: 'LOG_IN', payload: {
          token: loginData.token,
          user: {
            id: loginData.userId,
            name: loginData.name,
            avatar: loginData.avatar || null, // Assuming avatar can be null
            email: loginData.email,
          }
        }
      });
      loginSuccess = true;

    } catch (error) {
      console.error('Login error:', error);
      const { message: errorMessage } = error as HttpError;
      setMessage(errorMessage);
    }

    setIsFetching(false);

    if (loginSuccess) {
      const redirectPath = searchParams.get('redirect')
      redirect(redirectPath ? redirectPath : '/');
    }

  };

  return (
    <div className="my-20 flex justify-center">
      <form className="flex w-80 flex-col gap-4" onSubmit={handleSubmit}>
        <AppInput title="Email" required type="email" defaultValue={"aaa@ddd.com"} />
        <AppInput title="Senha" required type="password" defaultValue={"123456"} />
        <p className="text-red-600">{message}</p>
        <button
          type="submit"
          className="rounded-sm bg-green-700 p-2 font-semibold text-white disabled:bg-gray-500"
          disabled={isFetching}
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;