/* eslint-disable @next/next/no-img-element */
'use client';
import { DonateButton } from "@/components/DonateButton";
import CloseComponent from "@/components/Icons/Close";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop, Crop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from "./canvasPreview";

const CROP_ASPECT_RATIO = 16 / 9;



interface ImageCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropImage: (imageFile: File) => void;
  imageFile: File | null;
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

const ImageCropModal = ({ imageFile, isOpen, onClose, onCropImage }: ImageCropModalProps) => {

  const [crop, setCrop] = useState<Crop>()

  const [imgSrc, setImgSrc] = useState('')

  const imgRef = useRef<HTMLImageElement>(null)

  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  function onSelectFile(file: File) {
    setCrop(undefined) // Makes crop preview update between images.
    const reader = new FileReader()
    reader.addEventListener('load', () =>
      setImgSrc(reader.result?.toString() || ''),
    )
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (imageFile) {

      onSelectFile(imageFile as File)
    }
  }, [imageFile])

  async function onCropClick() {
    if (!imgRef.current || !previewCanvasRef.current || !crop) {
      return;
    }

    const { width, height } = imgRef.current

    canvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, width, height),
      1,
      0,
    )

    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current

    if (!image || !previewCanvas || !crop) {
      console.log(image, previewCanvas, crop)
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      crop.width * scaleX,
      crop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )

    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
      quality: 1,
    })

    onCropImage(new File([blob], imageFile?.name || 'cropped-image.jpg', {
      type: blob.type,
      lastModified: Date.now(),
    }))
    onClose();
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, CROP_ASPECT_RATIO))
  }

  return (
    <div className={clsx(
      "w-screen h-screen top-0 left-0 z-50 bg-gray-500/50 trans fixed flex justify-center items-center p-4",
      !isOpen && "hidden"
    )}
      onClick={onClose}
    >
      <div className="bg-white w-full md:w-md h-full md:h-fit rounded-md p-4 relative z-100" onClick={(e) => { e.stopPropagation() }}>
        <div className="absolute right-0 top-0 p-4">
          <button className="" onClick={onClose}>
            <CloseComponent className="fill-gray-600 hover:fill-gray-900 cursor-pointer" />
          </button>
        </div>
        <h2 className="text-primary font-bold text-xl">EDITAR IMAGEM</h2>
        <p className="text-default mt-4">Arraste e solte a imagem para definir a área de recorte.</p>

        {imgSrc &&
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            // onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={CROP_ASPECT_RATIO}
            className="mt-4">
            <img
              alt="crop me"
              src={imgSrc}
              ref={imgRef}
              onLoad={onImageLoad} />
          </ReactCrop>


        }
        {
          crop &&
          <canvas
            ref={previewCanvasRef}
            className="hidden"
          />
        }
        <div className="flex justify-end items-center mt-4 gap-4">
          <DonateButton className="bg-transparent border-gray-400 border-1 text-red-400" onClick={() => {
            onClose();
          }}>
            <span className="text-default">Fechar</span>
          </DonateButton>

          <DonateButton className="" onClick={onCropClick}>
            Recortar
          </DonateButton>
        </div>
      </div>

    </div >
  )
}

export { ImageCropModal }