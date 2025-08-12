'use client';
import { SafeArea } from "@/components/SafeArea";
import { Cause, getCauseBySlug } from "@/services/causesService";
import { redirect, RedirectType } from "next/navigation";
import { useEffect, useState } from "react";


const CreateCauseImages = ({ params }: {
  params: Promise<{ causeSlug: string }>;
}) => {

  const [isLoading, seIsLoading] = useState(true);

  const [cause, setCause] = useState<Cause>();

  useEffect(() => {
    const fetchCause = async () => {
      const { causeSlug } = await params;

      try {
        const cause = await getCauseBySlug(causeSlug);

        setCause(cause);

      } catch (error) {
        console.error('Error fetching cause:', error);
        redirect('/criar/', RedirectType.push);
      } finally {
        seIsLoading(false);
      }
    }

    fetchCause();

  }, [params])


  if (isLoading) {
    return (
      <SafeArea className="flex justify-center flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
      </SafeArea>
    );
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Parabéns</h1>
      <div>
        <p>Você criou a causa: <strong>{cause?.name}</strong></p>
      </div>
    </SafeArea>
  );
};

export default CreateCauseImages;