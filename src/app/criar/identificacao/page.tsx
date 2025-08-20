'use client';
import { AppInput } from "@/components/AppInput";
import { AppMaskedInput } from "@/components/AppInput/AppMaskedInput";
import { DonateButton } from "@/components/DonateButton";
import LeftArrow from "@/components/Icons/LeftArrow";
import { SafeArea } from "@/components/SafeArea";
import { StepBar } from "@/components/StepBar";
import { HttpError } from "@/services/httpError";
import { signup, verifyCpfExists, verifyEmailExists } from "@/services/sessionServices";
import { useAppStore } from "@/store";
import { isCpfValid } from "@/utils/cpf";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { FocusEventHandler, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod"

interface FormData {
  cpf: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}


const personNameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

const passwordSchema = z
  .string()
  .min(8, "A senha precisa ter ao menos 8 caracteres")
// .regex(/[A-Z]/, "A senha precisa ter ao menos uma letra maiúscula")
// .regex(/[a-z]/, "A senha precisa ter ao menos uma letra minúscula")
// .regex(/\d/, "A senha precisa ter ao menos um número")
// .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "A senha precisa ter ao menos um caractere especial");

const schema = z.object({
  name: z.string("Nome não informado")
    .nonempty("Nome não informado")
    .regex(personNameRegex, {
      message: "Nome inválido",
    })
    .min(3, "Nome muito curto"),
  email: z.email("Email inválido"),
  phone: z.string("Telefone não informado").length(11, "Telefone inválido"),
  cpf: z.string("CPF não informado").length(11, "CPF inválido").refine((val: string) => {
    return isCpfValid(val);
  }, {
    message: "CPF inválido",
  }),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas precisam ser iguais",
  path: ["confirmPassword"], // This specifies where the error message should be displayed
});

const CreateCauseIdentification = () => {

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {

    },
    resolver: zodResolver(schema)
  })

  const [serverError, setServerError] = useState("")

  const [cpfSearch, setCpfSearch] = useState<"FOUND" | "NOT_FOUND" | "PENDING">("PENDING");

  const [emailSearch, setEmailSearch] = useState<"FOUND" | "NOT_FOUND" | "PENDING">("PENDING");

  const showPasswordFields = cpfSearch === "NOT_FOUND" && emailSearch === "NOT_FOUND";

  const userAlreadyRegistered = cpfSearch === "FOUND" || emailSearch === "FOUND";

  const [state, dispatch] = useAppStore();

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    if (state.isAuthenticated) {
      redirect('/criar/detalhes', RedirectType.push);
      return;
    }

    let success;

    try {
      const response = await signup(data);

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

      success = true;

    } catch (error) {
      if (error instanceof HttpError) {
        setServerError(error.message)
      } else {
        console.error(error)
      }
    }

    if (success) {
      redirect('/criar/detalhes', RedirectType.push)
    }
  }

  const handleCpfBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    // onBlur gets masked value
    const plainCpf = e.target.value.replace(/\D/g, '');

    if (plainCpf.length != 11) {
      return;
    }
    const cpf = await verifyCpfExists(plainCpf);
    console.debug('CPF exists:', cpf.result);
    setCpfSearch(cpf.result ? "FOUND" : "NOT_FOUND");

  }

  const handleEmailBlur: FocusEventHandler<HTMLInputElement> = async (e) => {
    const emailResponse = await verifyEmailExists(e.target.value);
    console.debug('Email exists:', emailResponse.result);
    setEmailSearch(emailResponse.result ? "FOUND" : "NOT_FOUND");
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <form className="w-full max-w-md mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Link href={"/criar"}>
            <LeftArrow className="fill-default-light hover:fill-default cursor-pointer mb-10"></LeftArrow>
          </Link>
        </div>
        <StepBar currentStep={2} totalSteps={7} />

        {state.isAuthenticated && (
          <>
            <AppInput
              title="Nome"
              name="name"
              value={state.user?.name || ''}
              disabled
            />
          </>
        ) || (
            <>
              <p className="text-xl font-bold pt-4">
                <span>Qual o seu </span>
                <span className="text-primary">CPF?</span>
              </p>

              <Controller
                name="cpf"
                control={control}
                render={({ field }) =>
                  <AppMaskedInput
                    value={field.value}
                    onBlur={handleCpfBlur}
                    onAccept={(value: string) => field.onChange({ target: { value } })}
                    mask='000.000.000-00'
                    placeholder="000.000.000-00"
                    unmask
                    error={errors.cpf?.message}
                    className="w-full" />}
              />
              <p className="text-xl font-bold pt-4">
                Seu nome completo
              </p>
              <AppInput
                {...register("name")}
                error={errors.name?.message}
              />
              <p className="text-xl font-bold pt-4">
                Qual o seu email?
              </p>
              <AppInput
                {...register("email")}
                onBlur={handleEmailBlur}
                error={errors.email?.message}
              />
              <p className="text-xl font-bold pt-4">
                Qual o seu telefone?
              </p>
              <Controller
                name="phone"
                control={control}
                render={({ field }) =>
                  <AppMaskedInput
                    value={field.value}
                    onAccept={(value: string) => field.onChange({ target: { value } })}
                    title=""
                    mask='(00) 00000 0000'
                    placeholder="(00) 00000 0000"
                    autoComplete="tel"
                    unmask
                    error={errors.phone?.message}
                    className="w-full" />}
              />

              {
                userAlreadyRegistered && (
                  <div className="bg-gray-300 px-4 py-2 rounded-md">
                    Parece que você já possui cadastro na nossa plataforma, clique um continuar para entrar na sua conta
                  </div>
                )
              }

              {showPasswordFields && (
                <>
                  <p className="text-xl font-bold pb-4">
                    Crie uma senha:
                  </p>
                  <AppInput
                    title="Senha"
                    {...register('password')}
                    type="password"
                    autoComplete="new-password"
                    error={errors.password?.message}
                  />
                  <AppInput
                    title="Confirme sua senha"
                    {...register('confirmPassword')}
                    type="password"
                    autoComplete="new-password"
                    error={errors.confirmPassword?.message}
                  />
                </>
              )}
            </>
          )
        }

        {serverError !== "" &&
          <div className="rounded-md bg-red-500 text-white px-4 py-2">{serverError}</div>
        }

        {
          userAlreadyRegistered || state.isAuthenticated ?
            <Link href={"/entrar?redirect=/criar/detalhes"}>
              <DonateButton className="w-full mt-4" variant="lg">
                Continuar
              </DonateButton>
            </Link>
            :
            <DonateButton type="submit" className="w-full mt-4" variant="lg">
              Continuar
            </DonateButton>
        }
      </form>
    </SafeArea>
  );
};

export default CreateCauseIdentification;