import { getCauses } from "@/services/causesService";

export default async function Cause() {

  const causes = await getCauses();


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>causa</h1>

      {
        causes.map((cause) => (
          <div key={cause.id} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold">{cause.ownerName}</h2>
            <p className="text-gray-700">{cause.description}</p>
            <p className="text-gray-500">Goal: ${cause.goalAmount}</p>
            <p className="text-gray-500">Current: ${cause.currentAmount}</p>
            {cause.images.length > 0 && (
              <img src={cause.images[0].url} alt="Cause Image" className="mt-4 rounded" />
            )}

          </div>
        ))};
    </div>
  )
}
