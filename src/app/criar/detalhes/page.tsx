'use client';
import { AppInput } from "@/components/AppInput";
import { AppTextArea } from "@/components/AppTextArea";
import { DonateButton } from "@/components/DonateButton";
import LeftArrow from "@/components/Icons/LeftArrow";
import { SafeArea } from "@/components/SafeArea";
import { StepBar } from "@/components/StepBar";
import { useAppStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod"

interface FormData {
  description: string;
  deadlineDate?: string;
}

const schema = z.object({
  description: z.string("Descrição inválida").nonempty("Você precisa informar a descrição da sua causa"),
  deadlineDate: z.string().optional()
});

const CreateCauseDetails = () => {

  const [state, dispatch] = useAppStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      description: state.causeStored?.description || "",
      deadlineDate: state.causeStored?.deadlineDate ? state.causeStored?.deadlineDate : undefined
    },
    resolver: zodResolver(schema)
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        description: data.description,
        deadlineDate: data.deadlineDate,
      },
    });

    redirect('/criar/localizacao', RedirectType.push)
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <form className="w-full max-w-md mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Link href={"/criar/identificacao"}>
            <LeftArrow className="fill-default-light hover:fill-default cursor-pointer mb-10"></LeftArrow>
          </Link>
        </div>
        <StepBar currentStep={3} totalSteps={7} />
        <h1 className="text-2xl font-bold my-4">Informe os detalhes da sua causa</h1>
        <p className="text-default mb-2">
          Explique o <b>motivo</b> pelo qual você precisa arrecadar doações, como vai utilizar o valor arrecadado, e o quão importante é receber doações.
        </p>
        <Controller
          name="description"
          control={control}
          render={({ field }) =>
            <AppTextArea
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              placeholder="Quero arrecadar este valor para ajudar os cães da minha rua..."
              error={errors.description?.message}
            />}
        />
        <AppInput
          title="Sua causa tem um prazo final? (opcional)"
          className="mt-4"
          type="date"
          {...register("deadlineDate")}
          defaultValue={state.causeStored?.deadlineDate || ''}
          error={errors.deadlineDate?.message}
        />

        <DonateButton type="submit" className="w-full mt-4" variant="lg">
          Continuar
        </DonateButton>
      </form>
    </SafeArea>
  );
};

export default CreateCauseDetails;