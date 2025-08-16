import Image from "next/image";
import defaultCardImage from "/public/default-cause.jpg";
import { CauseDto } from "@/services/causesService";

interface CauseImageProps {
  image: CauseDto["image"];
}

const CauseImage = ({ image }: CauseImageProps) => {
  return (
    <div className="rounded-lg h-40 w-full overflow-hidden">
      <Image
        src={image?.url || defaultCardImage}
        height={image?.height}
        width={image?.width}
        alt="Cause Image"
        className="overflow-clip object-cover block w-full h-full"
      />
    </div>
  )
};

export { CauseImage }