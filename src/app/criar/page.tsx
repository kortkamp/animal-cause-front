'use client';
import { AppInput } from "@/components/AppInput";
import { SafeArea } from "@/components/SafeArea";
import { useAppStore } from "@/store";
import { redirect, RedirectType } from "next/navigation";
import { FormEvent } from "react";


const CreateCause = () => {

  const [state, dispatch] = useAppStore();
  // const [cause, setCause] = useState<CreateCauseRequest>({
  //   details: {
  //     title: '',
  //     description: '',
  //     deadlineDate: null,
  //   },
  //   location: {
  //     state: '',
  //     city: '',
  //     neighborhood: '',
  //     address: '',
  //     number: '',
  //     complement: '',
  //     zipCode: '',
  //     latitude: 0,
  //     longitude: 0,
  //   },
  //   goalAmount: 0,
  // });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Submitting cause:', e);

    const [title, amount] = e.target as unknown as { value: string }[];

    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        title: title.value,
        goalAmount: amount.value,
      },
    });

    console.log('Cause data:', {
      title: title.value,
      value: amount.value,
    });

    redirect('/criar/identificacao', RedirectType.push);
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Criar uma Causa</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>
        <AppInput
          title="Nome da sua causa"
          required
          name="title"
          placeholder="Ajude o caramelo"
          defaultValue={state.causeStored?.title || ''}
        />
        <AppInput
          title="Qual valor você precisa?"
          placeholder="R$ 1000,00"
          required
          name="goalAmount"
          defaultValue={state.causeStored?.goalAmount || ''}
          type="number"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continuar
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCause;