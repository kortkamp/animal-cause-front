'use client';

import { CauseDonation, getCauseDonations } from "@/services/causesService";
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
    <div>
      <h2>Cause Donations</h2>

      <ul className="text-gray-700 text-xs">
        {donations.map(donation => (
          <li key={donation.id}>
            <p>Doador: {donation.donorName}</p>
            <p>Valor: R${donation.amount}</p>
            <p>Data: {donation.date}</p>
          </li>
        ))}
      </ul>
      {/* Add your component logic here */}
    </div>
  );
}


export { CauseDonations }