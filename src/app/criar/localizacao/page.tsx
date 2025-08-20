'use client';
import { AppInput } from "@/components/AppInput";
import { AppSelect } from "@/components/AppSelect";
import { DonateButton } from "@/components/DonateButton";
import LeftArrow from "@/components/Icons/LeftArrow";
import { SafeArea } from "@/components/SafeArea";
import { StepBar } from "@/components/StepBar";
import { getOpenStreetMapsLocation } from "@/services/geolocationService";
import { useAppStore } from "@/store";
import { states } from "@/utils/states";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod"
import { AutocompleteCityInput } from "@/components/AppInput/AutocompleteCityInput";

interface FormData {
  state: string;
  city: string;
  address?: string;
}

const schema = z.object({
  state: z.string().nonempty("Informe o estado"),
  city: z.string().nonempty("Informe a sua cidade"),
  address: z.string().optional(),
});


const CreateCauseLocation = () => {

  const [state, dispatch] = useAppStore();

  const [serverError, setServerError] = useState("")

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      state: state.causeStored?.state || "",
      city: state.causeStored?.city || "",
      address: state.causeStored?.address || "",
    },
    resolver: zodResolver(schema)
  })


  const findLocation = async (state: string, city: string, address?: string) => {
    let location;

    const locations = await getOpenStreetMapsLocation(state, city, address);

    if (locations.length > 0) {
      location = locations.find(loc => loc.addresstype === 'town');

      if (!location) {
        location = locations[0]
      }
      setServerError("")
    }

    return location;
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {

    setIsLoading(true);
    let location
    try {

      location = await findLocation(data.state, data.city, data.address || "centro");

      if (!location) {
        location = await findLocation(data.state, data.city, "centro");
      }

      if (!location) {
        location = await findLocation(data.state, data.city);
      }
    } catch (error) {
      console.error("Error finding location:", error);
    }

    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        state: data.state,
        city: data.city,
        address: data.address,
        latitude: location?.lat,
        longitude: location?.lon,
      },
    });

    setIsLoading(false);

    // console.log(`https://www.google.com/maps/search/${location.lat},+${location.lon}`)

    redirect('/criar/imagens', RedirectType.push);
  }

  const uf = watch("state")

  const handleChangeUF = () => {
    setValue("city", "");
    setValue("address", "");
  }

  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <form className="w-full max-w-md mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Link href={"/criar/detalhes"}>
            <LeftArrow className="fill-default-light hover:fill-default cursor-pointer mb-10"></LeftArrow>
          </Link>
        </div>
        <StepBar currentStep={4} totalSteps={7} />

        <h2 className="text-xl font-bold text-default my-4">
          <span>Informe a </span>
          <span className="text-primary">localização</span>
          <span> da sua Causa.</span>
        </h2>
        <p className="text-sm text-default pb-4">Informando a sua locação será possível direcionar a sua causa para as pessoas que estão perto de você.</p>
        <AppSelect
          title="Estado"
          {...register("state")}
          error={errors.state?.message}
          onChange={handleChangeUF}
        >
          {Object.entries(states).map(state => (
            <option key={state[0]} value={state[0]}>{state[1]}</option>
          ))
          }
        </AppSelect>

        <Controller
          name="city"
          control={control}
          render={({ field }) =>
            <AutocompleteCityInput
              title="Cidade"
              uf={uf}
              error={errors.city?.message}
              onBlur={field.onBlur}
              onChange={field.onChange}
              value={field.value}
              ref={field.ref}
            />}
        />

        <AppInput
          title="Endereço"
          {...register("address")}
          error={errors.address?.message}
        />

        {serverError !== "" &&
          <div className="rounded-md bg-red-500 text-white px-4 py-2 text-sm">{serverError}</div>
        }
        <DonateButton isLoading={isLoading} type="submit" className="w-full mt-4" variant="lg">
          Continuar
        </DonateButton>
      </form>
    </SafeArea>
  );
};

export default CreateCauseLocation;