import { CauseCard } from "@/components/CauseCard";
import { SafeArea } from "@/components/SafeArea";
import { getCauses } from "@/services/causesService";

export default async function Cause() {

  const causes = await getCauses();

  return (
    <SafeArea>
      <div className="flex justify-center pb-20 gap-16">
        <div className="flex flex-wrap justify-between">
          {causes.map((cause) => (
            <CauseCard key={cause.id} cause={cause} />
          ))}
        </div>
      </div>
    </SafeArea>
  )
}
