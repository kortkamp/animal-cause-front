'use client';
import { AppRadioButton } from "@/components/AppRadioButton";
import { CreditCardForm } from "@/components/CreditCardForm";
import { DonateButton } from "@/components/DonateButton";
import { SafeArea } from "@/components/SafeArea";
import { FullCauseResponse, getCauseBySlug, makePixDonationAuthenticated, makePixDonationUnauthenticated } from "@/services/causesService";
import { useAppStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { HttpError } from "@/services/httpError";
import { AppMoneyInput } from "@/components/AppInput/AppMoneyInput";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { AppMaskedInput } from "@/components/AppInput/AppMaskedInput";
import { AppInput } from "@/components/AppInput";
import { isCpfValid } from "@/utils/cpf";

export interface FormData {
  amount: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

const personNameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;

const schema = z.object({
  amount: z.coerce.number<number>("Valor não informado").min(5, "A doação não pode ser menor que R$5,00"),
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
  })
})

export default function Donation({ params }: {
  params: Promise<{ causeSlug: string }>;
}) {

  const pathname = usePathname()

  const [cause, setCause] = useState<FullCauseResponse | null>(null);

  const [isCreatingDonation, setIsCreatingDonation] = useState<boolean>(false);

  const [state] = useAppStore();

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'creditCard'>('pix');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data)

    setIsCreatingDonation(true);

    let donationId;
    try {
      if (state.isAuthenticated) {
        const response = await makePixDonationAuthenticated(cause!.id, cause!.name, data.amount);
        donationId = response.id;
      } else {
        const response = await makePixDonationUnauthenticated(
          cause!.id,
          cause!.name,
          data.amount,
          data.name,
          data.email,
          data.cpf,
          data.phone
        );
        donationId = response.id;
      }

    } catch (error: unknown) {
      console.error("Error creating donation:", (error as HttpError).message);
    } finally {
      setIsCreatingDonation(false);
    }

    if (donationId) {
      redirect(pathname + `/obrigado/${donationId}`);
    }
  }

  useEffect(() => {
    const fetchCause = async () => {
      const causeData = await getCauseBySlug((await params).causeSlug);
      setCause(causeData);
    };
    fetchCause();
  }, [params]);

  if (!cause) {
    return <div>Loading...</div>;
  }

  return (
    <SafeArea>
      <div className="flex flex-col px-4 py-10">
        <div className="text-xs flex gap-1">
          {state.isAuthenticated
            ? <>
              <p className="font-semibold">{`Olá, ${state.user?.name}.`}</p>
              <p>Não é você?</p>
              <Link href={`/entrar?redirect=${pathname}&logout=true`} className="underline">Clique aqui</Link>
            </>
            : <Link href={`/entrar?redirect=${pathname}`} className="underline">Faça login</Link>}
        </div>
        <div className="mb-4 mt-10">
          <h1 className="text-2xl font-bold text-default pb-2">
            {cause.name}
          </h1>
          <p className="">ID {cause.id}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>

          {!state.isAuthenticated &&
            // <DonorIdentification register={register} />
            <div className="flex flex-wrap gap-4 justify-between">
              <Controller
                name="phone"
                control={control}
                render={({ field }) =>
                  <AppMaskedInput
                    value={field.value}
                    onAccept={(value: string) => field.onChange({ target: { value } })}
                    title="Telefone (WhatsApp)"
                    mask='(00) 00000 0000'
                    placeholder="(00) 00000 0000"
                    unmask
                    error={errors.phone?.message}
                    className="w-full sm:w-5/12" />}
              />

              <AppInput
                {...register("email")}
                title="E-mail" type="email"
                error={errors?.email?.message}
                className="w-full sm:w-6/12" />
              <Controller
                name="cpf"
                control={control}
                render={({ field }) =>
                  <AppMaskedInput
                    value={field.value}
                    onAccept={(value: string) => field.onChange({ target: { value } })}
                    onBlur={field.onBlur}
                    unmask
                    placeholder="000.000.000-00"
                    mask='000.000.000-00'
                    overwrite="shift"
                    title="CPF"
                    error={errors?.cpf?.message}
                    className="w-full sm:w-4/12" />}
              />

              <AppInput
                title="Nome completo" type="text"
                error={errors?.name?.message}
                {...register("name")}
                className="w-full sm:w-7/12" />
            </div>
          }

          <div className="mt-10">
            <Controller
              name="amount"
              control={control}
              render={({ field }) =>
                <AppMoneyInput
                  placeholder="0,00"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  title="Valor da Contribuição"
                  error={errors.amount?.message}
                />}
            />

          </div>

          <div className="mt-10">
            <h2 className="text-md font-bold text-default">Forma de pagamento</h2>
            <div>
              <div className="flex gap-2 my-2">
                <AppRadioButton
                  title="Pix"
                  selected={paymentMethod === 'pix'}
                  onClick={() => setPaymentMethod('pix')}
                >
                  Pix
                </AppRadioButton>
                <AppRadioButton
                  title="Cartão de Crédito"
                  selected={paymentMethod === 'creditCard'}
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  Cartão de Crédito
                </AppRadioButton>
              </div>
            </div>
          </div>

          {paymentMethod === 'creditCard' &&
            <CreditCardForm />
          }

          {/* <ul className="bg-red-700 text-gray-100 rounded-md">
          {Object.values(identificationErrors).map(error => (
            <li key={error} className="px-4 first:pt-4 last:pb-4">
            {error}
            </li>
            ))}
            </ul> */}

          <div className="mt-5 w-full">
            <DonateButton
              isLoading={isCreatingDonation}
              // onClick={handleCreateDonation}
              type="submit"
              className="w-full sm:w-1/2"
              variant="lg">
              CONTRIBUIR
            </DonateButton>
          </div>
        </form>

      </div>
    </SafeArea >
  )
}
