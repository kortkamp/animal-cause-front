/* eslint-disable @next/next/no-img-element */
'use client';
import { ClickCopyIcon } from "@/components/ClickCopyIcon";
import PhoneCopySVGComponent from "@/components/Icons/PhoneCopy";
import { SafeArea } from "@/components/SafeArea";
import { getDonationById, PixDonationResponse } from "@/services/causesService";
import { useEffect, useState } from "react";

export default function Thanks({ params }: {
  params: Promise<{ donationId: string }>;
}) {

  const [donation, setDonation] = useState<PixDonationResponse>();

  useEffect(() => {
    const fetchDonation = async () => {
      const donationData = await getDonationById((await params).donationId);
      setDonation(donationData);
      console.log(donationData);
    }
    fetchDonation();
  }, [params])

  if (!donation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }


  const reloadPage = () => {
    window.location.reload();
  }


  if (donation.currentStatus == "PAID") {
    return (
      <SafeArea>
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold">Obrigado pela sua doação!</h1>
          <p className="text-lg">Sua contribuição é muito importante para nós.</p>
        </div>
      </SafeArea>
    )
  }

  return (
    <div className="">
      <SafeArea className="p-4">
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-center text-default">Faça o pagamento para confirmar a sua doação</h1>
        </div>
        <div className="flex items-center justify-between sm:flex-row flex-col-reverse gap-8">
          <div className="flex items-center justify-center p-8 bg-gray-100 flex-col md:flex-row gap-4 w-full md:w-5xl">
            <img className="md:w-50 md:h-50" src={"data:image/png;base64," + donation.pixBase64} alt="QrCode Pix" />
            <ol className="text-sm text-center md:text-left">
              <li className="font-bold">{donation.causeName}</li>
              <li>
                ID Causa: {donation.causeId}
              </li>
              <li>
                ID Doação: {donation.id}
              </li>
              <li>
                Data: {new Date(donation.creationDate).toLocaleDateString("pt-BR")}
              </li>
              <li>
                E-mail: {donation.payer.email}
              </li>
              <li>
                Valor: {donation.amount.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </li>
              <li>
                Método: Pix
              </li>
            </ol>
          </div>
          <div className="w-full flex gap-4 flex-col">
            <h2 className="font-bold text-default hidden md:block">Pix Copia e Cola</h2>
            <div className="flex gap-4 items-center text-default">
              <PhoneCopySVGComponent className="w-20" />
              <p><b>Clique no botão</b> para <b>copiar o código</b> e escolha pagar via <b>Pix Copia e Cola</b> no aplicativo do seu banco.</p>
            </div>
            <div className="py-2 px-4 flex flex-row items-center justify-between border border-gray-300 rounded gap-2 w-full">
              <input
                readOnly
                className="w-full overflow-ellipsis outline-none"
                value={donation.pixQrCode}
              />
              <ClickCopyIcon content={donation.pixQrCode} />
            </div>
            <div>
              <p className="text-xs text-blue-400 cursor-pointer pt-4 text-right" onClick={reloadPage}>Já realizei o pagamento</p>
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
}



