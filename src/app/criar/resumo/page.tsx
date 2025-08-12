'use client';
import { SafeArea } from "@/components/SafeArea";
import { createCause, CreateCauseRequest } from "@/services/causesService";
import { useAppStore } from "@/store";
import { redirect, RedirectType } from "next/navigation";
import { FormEvent } from "react";


const CreateCauseResume = () => {


  const [state, dispatch] = useAppStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();


    if (!state.causeStored) {
      redirect('/criar/criar', RedirectType.push)
    }

    if (!state.causeStored.title || !state.causeStored.goalAmount) {
      redirect('/criar/criar', RedirectType.push)
    }

    const createCauseRequest: CreateCauseRequest = {
      details: {
        title: state.causeStored.title,
        description: state.causeStored.description || '',
        deadlineDate: state.causeStored.deadlineDate,
      },
      location: {
        state: state.causeStored.state || '',
        city: state.causeStored.city || '',
        neighborhood: state.causeStored.neighborhood || '',
        address: state.causeStored.address || '',
        number: state.causeStored.number || '',
        complement: state.causeStored.complement || '',
        zipCode: state.causeStored.zipCode || '',
        latitude: state.causeStored.latitude!,
        longitude: state.causeStored.longitude!,
      },
      goalAmount: state.causeStored.goalAmount,
    }

    try {
      const response = await createCause(createCauseRequest);
      dispatch({ type: 'CLEAR_CAUSE' });
      redirect('/criar/parabens' + response.id, RedirectType.push)

    } catch (error) {
      console.error('Error creating cause:', error);
      // Handle error appropriately, e.g., show a notification
      return;
    }
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Resumo</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Criar Causa
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCauseResume;