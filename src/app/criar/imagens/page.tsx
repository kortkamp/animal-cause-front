/* eslint-disable @next/next/no-img-element */
'use client';
import { DonateButton } from "@/components/DonateButton";
import LeftArrow from "@/components/Icons/LeftArrow";
import { SafeArea } from "@/components/SafeArea";
import { StepBar } from "@/components/StepBar";
import { useAppStore } from "@/store";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import defaultCardImage from "/public/default-cause.jpg";
import Image from "next/image";
import 'react-image-crop/dist/ReactCrop.css'
import { ImageCropModal } from "@/components/ImageCropModal";





const CreateCauseImages = () => {


  const [state, dispatch] = useAppStore();

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);

      setIsCropModalOpen(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    redirect('/criar/resumo', RedirectType.push)
  }


  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <ImageCropModal
        imageFile={imageFile}
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        onCropImage={(file: File) => {
          setImageFile(file);
          setIsCropModalOpen(false);
        }}
      ></ImageCropModal>

      <form className="w-full max-w-md mt-4 px-4" onSubmit={handleSubmit}>
        <div>
          <Link href={"/criar/localizacao"}>
            <LeftArrow className="fill-default-light hover:fill-default cursor-pointer mb-10"></LeftArrow>
          </Link>
        </div>
        <StepBar currentStep={5} totalSteps={7} />

        <h1 className="text-xl font-bold mt-4">
          <span>
            Escolha uma
          </span>
          <span className="text-primary">
            {" imagem "}
          </span>
          <span>
            para sua causa
          </span>
        </h1>
        <p className="text-sm mt-4">
          Inspire seus doadores com uma imagem que vai ajudar a ilustrar a sua causa. Uma boa foto é muito importante para criar conexão entre a sua vaquinha e quem vai doar.
        </p>

        <div className="mt-4 hover:brightness-50 cursor-pointer" onClick={handleImageUploadClick}>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded"
              className=""
            />
          ) : (
            <Image src={defaultCardImage} alt="" />
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept={"image/*"}
            style={{ display: "none" }}
            onChange={updateImage}
          />
        </div>

        <DonateButton variant="lg" type="submit" className="w-full mt-4">
          Continuar
        </DonateButton>
      </form>
    </SafeArea>
  );
};

export default CreateCauseImages;