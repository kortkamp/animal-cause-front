'use client';
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

  const onClickCopyPix = () => {
    navigator.clipboard.writeText(donation.pixQrCode);
    alert("Pix copiado para a área de transferência!");
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
      <SafeArea>
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold">Faça o pagamento para confirmar a sua doação</h1>
        </div>
        <div className="flex items-center justify-between sm:flex-row flex-col">
          <div className="flex items-center justify-center p-8 bg-gray-100">
            <img className="w-50 h-50" src={"data:image/png;base64," + donation.pixBase64} alt="QrCode Pix" />
            <ol className="text-sm">
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
          <div className="">
            <h2>Pix Copia e Cola</h2>
            <div className="h-10 flex flex-row items-center border border-gray-300 rounded p-2 gap-2">
              <input
                readOnly
                className=" overflow-ellipsis outline-none "
                value={donation.pixQrCode}
              />
              <span onClick={onClickCopyPix} className="cursor-pointer text-blue-500 hover:text-blue-700">
                CPY
              </span>
            </div>
            <div>
              <p className="text-xs text-blue-400 cursor-pointer" onClick={reloadPage}>Já realizei o pagamento</p>
            </div>
          </div>
        </div>
      </SafeArea>
    </div>
  );
}



