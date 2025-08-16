'use client';

import { CauseDonation, getCauseDonations } from "@/services/causesService";
import { timeSince } from "@/utils/date";
import { toMoney } from "@/utils/money";
import { useEffect, useState } from "react";

interface CauseDonationsProps {
  causeId: string;
}

const CauseDonations = ({ causeId }: CauseDonationsProps) => {

  const [donations, setDonations] = useState<CauseDonation[]>([]);


  useEffect(() => {
    const fetchDonations = async () => {
      const response = await getCauseDonations(causeId);
      setDonations(response);
    }
    fetchDonations();
  }, [causeId]);

  console.log(typeof donations[0]?.date);

  return (
    <div className="text-sm">
      {donations.map(donation => (
        <div key={donation.id} className="border-b border-gray-300 p-4">
          <div className="flex justify-between">
            <p>Doador: {donation.donorName}</p>
            <p>{timeSince(new Date(donation.date))}</p>

          </div>
          <p>Valor: {toMoney(donation.amount)}</p>
        </div>
      ))}
    </div>
  );
}


export { CauseDonations }