'use client';
import { AppInput } from "@/components/AppInput";
import { SafeArea } from "@/components/SafeArea";
import { signup, verifyCpfExists, verifyEmailExists } from "@/services/sessionServices";
import { useAppStore } from "@/store";
import { redirect, RedirectType } from "next/navigation";
import { FocusEventHandler, FormEvent, useState } from "react";

const CreateCauseIdentification = () => {

  const [cpfExists, setCpfExists] = useState(false);

  const [emailExists, setEmailExists] = useState(false);

  const userExists = cpfExists || emailExists;

  const [state, dispatch] = useAppStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (state.isAuthenticated) {
      redirect('/criar/detalhes', RedirectType.push);
      return;
    }

    if (userExists) {
      redirect('/entrar?redirect=/criar/detalhes', RedirectType.push)
      return;
    }

    const [cpf, name, email, phone, password, passwordConfirmation] = e.target as unknown as { value: string }[];

    const createUserRequest = {
      cpf: cpf.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      password: password.value,
    };

    const response = await signup(createUserRequest);

    dispatch({
      type: 'LOG_IN', payload: {
        token: response.token,
        user: {
          id: response.userId,
          name: response.name,
          avatar: response.avatar || null, // Assuming avatar can be null
          email: response.email,
        }
      }
    })

    redirect('/criar/detalhes', RedirectType.push)
  }

  const handleCpfBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.value.length != 11) {
      return;
    }
    const cpf = await verifyCpfExists(e.target.value);
    console.debug('CPF exists:', cpf.result);
    setCpfExists(cpf.result);
  }

  const handleEmailBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    const emailResponse = await verifyEmailExists(e.target.value);
    console.debug('Email exists:', emailResponse.result);
    setEmailExists(emailResponse.result);
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Informe seus dados</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>

        {state.isAuthenticated && (
          <>
            <AppInput
              title="Nome"
              required
              name="title"
              value={state.user?.name || ''}
              autoComplete="cpf"

              disabled
            />
          </>
        ) || (
            <>
              <AppInput
                title="CPF"
                required
                name="title"
                placeholder="Ajude o caramelo"
                onBlur={handleCpfBlur}
                type="number"
                autoComplete="cpf"
              />
              <AppInput
                title="Seu nome completo"
                required
                name="name"
              />

              <AppInput
                title="Seu email"
                required
                name="email"
                onBlur={handleEmailBlur}
              />

              <AppInput
                title="Seu telefone (WhatsApp)"
                required
                name="number"
                autoComplete="tel phone"
              />

              {!userExists && (
                <>
                  <AppInput
                    title="Senha"
                    required
                    name="password"
                    type="password"
                    autoComplete="new-password"
                  />
                  <AppInput
                    title="Confirme sua senha"
                    required
                    name="passwordConfirmation"
                    type="password"
                    autoComplete="new-password"
                  />
                </>
              )}
            </>
          )
        }



        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continuar
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCauseIdentification;