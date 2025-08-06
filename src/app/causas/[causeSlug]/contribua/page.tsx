'use client';
import { AppInput } from "@/components/AppInput";
import { AppRadioButton } from "@/components/AppRadioButton";
import { CreditCardForm } from "@/components/CreditCardForm";
import { DonateButton } from "@/components/DonateButton";
import { DonorIdentification } from "@/components/DonorIdentification";
import { SafeArea } from "@/components/SafeArea";
import { Cause, getCauseBySlug, makePixDonationAuthenticated, makePixDonationUnauthenticated } from "@/services/causesService";
import { useAppStore } from "@/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { HttpError } from "@/services/httpError";




export default function Donation({ params }: {
  params: Promise<{ causeSlug: string }>;
}) {

  const pathname = usePathname()

  const [cause, setCause] = useState<Cause | null>(null);

  const [isCreatingDonation, setIsCreatingDonation] = useState<boolean>(false);

  const [state] = useAppStore();

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'creditCard'>('pix');

  const [identificationData, setIdentificationData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const [donationAmount, setDonationAmount] = useState<number>(0);

  useEffect(() => {
    const fetchCause = async () => {
      const causeData = await getCauseBySlug((await params).causeSlug);
      setCause(causeData);
    };
    fetchCause();
  }, [params]);

  const handleCreateDonation = async () => {
    setIsCreatingDonation(true);
    let donationId;
    try {
      if (state.isAuthenticated) {
        const response = await makePixDonationAuthenticated(cause!.id, cause!.name, donationAmount);
        donationId = response.id;
      } else {
        const response = await makePixDonationUnauthenticated(
          cause!.id,
          cause!.name,
          donationAmount,
          identificationData.name,
          identificationData.email,
          identificationData.cpf,
          identificationData.phone
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
  };


  if (!cause) {
    return <div>Loading...</div>;
  }

  return (
    <SafeArea>
      <div className="flex flex-col">

        <div className="text-xs">
          {state.isAuthenticated
            ? `Olá, ${state.user?.name}`
            : <Link href={`/entrar?redirect=${pathname}`} className="underline">Faça login</Link>}
        </div>
        <h1 className="text-xl font-bold mb-4 mt-10">
          {cause.name}
        </h1>

        {!state.isAuthenticated &&
          <DonorIdentification identificationData={identificationData} setIdentificationData={setIdentificationData} />
        }

        <div className="mt-10">
          <AppInput
            value={donationAmount}
            onChange={e => setDonationAmount(Number(e.target.value))}
            title="Valor da Contribuição"
            type="number" />
        </div>

        <div className="mt-10">
          <h2 className="text-md">Forma de pagamento</h2>
          <div>
            <div className="flex gap-2 mt-2">
              <AppRadioButton title="Pix" selected={paymentMethod === 'pix'} onClick={() => setPaymentMethod('pix')}>
                Pix
              </AppRadioButton>
              {/* <AppRadioButton title="Cartão de Crédito" selected={paymentMethod === 'creditCard'} onClick={() => setPaymentMethod('creditCard')}>
                Cartão de Crédito
              </AppRadioButton> */}
            </div>
          </div>
        </div>

        {paymentMethod === 'creditCard' &&
          <CreditCardForm />
        }

        <div className="mt-10 w-full">
          <DonateButton disabled={isCreatingDonation} onClick={handleCreateDonation} className="w-full sm:w-1/2"></DonateButton>
        </div>

      </div>
    </SafeArea >
  )
}
