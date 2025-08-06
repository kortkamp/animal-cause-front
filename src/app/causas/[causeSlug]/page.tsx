import { DonateButton } from "@/components/DonateButton";
import { SafeArea } from "@/components/SafeArea";
import { getCauseBySlug } from "@/services/causesService";
import Link from "next/link";

export default async function Cause({ params }: {
  params: Promise<{ causeSlug: string }>;
}) {

  const cause = await getCauseBySlug((await params).causeSlug);

  return (
    <SafeArea>
      <div className="">
        <div key={cause.id} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold">{cause.name}</h2>
          <p className="text-gray-700">{cause.description}</p>
          <p className="text-gray-500 text-sm">Organizador: {cause.ownerName}</p>
          <p className="text-gray-500">Meta: ${cause.goalAmount}</p>
          <p className="text-gray-500">Valor atual: ${cause.currentAmount}</p>
          {cause.images.length > 0 && (
            <img src={cause.images[0].url} alt="Cause Image" className="mt-4 rounded" />
          )}
        </div>
        <Link href={`/causas/${cause.slug}/contribua`} className="mt-4">
          <DonateButton />
        </Link>
      </div>
    </SafeArea>
  )
}
