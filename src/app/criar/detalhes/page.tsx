'use client';
import { AppInput } from "@/components/AppInput";
import { SafeArea } from "@/components/SafeArea";
import { useAppStore } from "@/store";
import { redirect } from "next/navigation";
import { FormEvent } from "react";


const CreateCauseDetails = () => {


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

    const [description, deadlineDate] = e.target as unknown as { value: string }[];

    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        description: description.value,
        deadlineDate: deadlineDate.value,
      },
    });



    redirect('/criar/imagens')


  }



  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Informe os detalhes da sua causa</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>
        <AppInput
          title="Descrição da sua causa"
          required
          name="description"
          placeholder="Estou arrecadando fundos para..."
          type="text"
          defaultValue={state.causeStored?.description || ''}
        />
        <AppInput
          title="Sua causa tem data para acabar? (opcional)"
          type="date"
          name="deadlineDate"
          defaultValue={state.causeStored?.deadlineDate || ''}
        />

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continuar
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCauseDetails;