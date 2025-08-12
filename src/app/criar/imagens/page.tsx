'use client';
import { SafeArea } from "@/components/SafeArea";
import { useAppStore } from "@/store";
import { redirect, RedirectType } from "next/navigation";
import { FormEvent } from "react";


const CreateCauseImages = () => {


  const [state, dispatch] = useAppStore();


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    redirect('/criar/localizacao', RedirectType.push)
  }



  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Adicione imagens</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continuar
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCauseImages;