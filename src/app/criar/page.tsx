'use client';
import { AppInput } from "@/components/AppInput";
import { AppMoneyInput } from "@/components/AppInput/AppMoneyInput";
import { DonateButton } from "@/components/DonateButton";
import { SafeArea } from "@/components/SafeArea";
import { StepBar } from "@/components/StepBar";
import { useAppStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, RedirectType } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod"


interface FormData {
  amount: number;
  title: string
}

const schema = z.object({
  amount: z.coerce.number<number>("Valor inválido"),
  title: z.string("O nome é inválido").nonempty("O nome é obrigatório")
})

const CreateCause = () => {

  const [state, dispatch] = useAppStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: state.causeStored?.goalAmount ? Number(state.causeStored?.goalAmount) : undefined,
      title: state.causeStored?.title || ""
    },
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        title: data.title,
        goalAmount: data.amount.toString(),
      },
    });

    redirect('/criar/identificacao', RedirectType.push);
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <form className="w-full max-w-md flex flex-col gap-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
        <StepBar currentStep={1} totalSteps={7} />
        <h1 className="text-3xl font-bold mb-4">Vamos começar a sua nova Causa Animal</h1>


        <h2 className="text-xl font-bold text-default">
          <span>De quanto você </span>
          <span className="text-primary">precisa?</span>
        </h2>
        <p>Defina sua meta para que doadores possam saber quanto falta para você chegar lá. Você pode editar esse valor quando quiser.</p>

        <Controller
          name="amount"
          control={control}
          render={({ field }) =>
            <AppMoneyInput
              defaultValue={field.value}
              placeholder="1000,00"
              onChange={field.onChange}
              onBlur={field.onBlur}
              title=""
              error={errors.amount?.message}
            />}
        />



        <h2 className="text-xl font-bold text-default">
          <span>De um nome para sua </span>
          <span className="text-primary">Causa Animal</span>
        </h2>
        <AppInput
          title=""
          placeholder="Ajude o caramelo"
          defaultValue={state.causeStored?.title || ''}
          {...register("title")}
          error={errors.title?.message}
        />

        <p>Ao clicar no botão abaixo você declara que é maior de 18 anos, leu e está de acordo com os Termos, Taxas, Prazos e Regulamentos.</p>
        <DonateButton type="submit" variant="lg">
          Continuar
        </DonateButton>
      </form>
    </SafeArea>
  );
};

export default CreateCause;