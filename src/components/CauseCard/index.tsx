import { CauseDto } from "@/services/causesService";
import Link from "next/link";

import { CauseImage } from "./CauseImage";

interface CauseCardProps {
  cause: CauseDto
}

const CauseCard = ({ cause }: CauseCardProps) => {
  return (
    <div className="w-full md:max-w-1/3 md:grow-0 md:shrink-0 md:basis-1/3 px-4 pb-10">
      <Link href={`/causas/${cause.slug}`} className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-full p-4">
          <CauseImage image={cause.image} />
          <div className="my-4 w-full flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-md text-ellipsis whitespace-nowrap overflow-hidden">{cause.title}</h2>
              <p className="text-sm text-gray-500 text-ellipsis whitespace-nowrap overflow-hidden">ID {cause.id}</p>
              <p className="text-sm text-gray-600">{cause.city}, {cause.uf}</p>
            </div>
            <div className="flex items-center gap-1">
              <img src={"https://ui-avatars.com/api/?background=009D4E&bold=true&color=fff&ims=40x40&name=EMILLY%20KELLY%20VIDAL%3Fims%3D225x225"} className="h-10 h-10 rounded-full"></img>
              <div>
                <p className="text-sm font-bold text-gray-700">{cause.ownerName}</p>
                <p className="text-xs text-gray-500">
                  Cadastro em {(new Date(cause.registerDate)).toLocaleString('pt-BR', { month: 'long' })}/{new Date(cause.registerDate).getFullYear()}
                </p>
              </div>
            </div>
            <div className="">
              <span className="text-primary font-bold ">R$ {cause.currentAmount.toFixed(2)}</span>
              <span className="text-gray-600"> de {cause.goalAmount.toFixed(2)}</span>
            </div>
            <div className="w-full h-1 bg-gray-100 rounded overflow-clip">
              <div className="h-1 bg-primary rounded" style={{ width: `${100 * cause.currentAmount / cause.goalAmount}%` }}></div>
            </div>
          </div >
        </div>
      </Link >
    </div>
  );
}


export { CauseCard };