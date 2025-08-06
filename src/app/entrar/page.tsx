'use client';

import { AppInput } from '@/components/AppInput';
import { Spinner } from '@/components/Spinner';
import { HttpError } from '@/services/httpError';
import { login } from '@/services/sessionServices';
import { useAppStore } from '@/store';
import { useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

const Login = () => {

  const searchParams = useSearchParams()

  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  const [state, dispatch] = useAppStore();

  useEffect(() => {
    if (state.isAuthenticated) {
      const redirectPath = searchParams.get('redirect')
      redirect(redirectPath ? redirectPath : '/');
    }
    setIsLoading(false);
  }, [searchParams, state]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [email, password] = e.target as unknown as { value: string }[];

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

    } catch (error) {
      console.error('Login error:', error);
      const { message: errorMessage } = error as HttpError;
      setMessage(errorMessage);
    }

  };

  if (isLoading) {
    return (
      <div className="my-20 flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="my-20 flex justify-center">
      <form className="flex w-80 flex-col gap-4" onSubmit={handleSubmit}>
        <AppInput title="Email" required type="email" defaultValue={"aaa@ddd.com"} />
        <AppInput title="Senha" required type="password" defaultValue={"123456"} />
        <p className="text-red-600">{message}</p>
        <button
          type="submit"
          className="rounded-sm bg-green-700 p-2 font-semibold text-white"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;