import { getCauses } from "@/services/causesService";
import Link from "next/link";

export default async function Cause() {

  const causes = await getCauses();

  return (
    <div className="flex justify-center  p-8 pb-20 gap-16 sm:p-20">
      {
        causes.map((cause) => (
          <Link
            href={`/causas/${cause.slug}`}
            key={cause.id} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold">{cause.name}</h2>
            <p className="text-gray-700">{cause.description}</p>
            <p className="text-gray-500 text-sm">Organizador: {cause.ownerName}</p>
            <p className="text-gray-500">Meta: ${cause.goalAmount}</p>
            <p className="text-gray-500">Valor atual: ${cause.currentAmount}</p>
            {cause.images.length > 0 && (
              <img src={cause.images[0].url} alt="Cause Image" className="mt-4 rounded" />
            )}

          </Link>
        ))}
    </div>
  )
}
