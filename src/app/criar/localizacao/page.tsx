'use client';
import { AppInput } from "@/components/AppInput";
import { SafeArea } from "@/components/SafeArea";
import { getLocation } from "@/services/geolocationService";
import { useAppStore } from "@/store";
import { redirect, RedirectType } from "next/navigation";
import { FormEvent } from "react";


const CreateCauseLocation = () => {


  const [state, dispatch] = useAppStore();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const [uf, city] = e.target as unknown as { value: string }[];

    let location;

    if (uf.value && city.value) {
      const locations = await getLocation(uf.value, city.value);

      console.log('Locations found:', locations);
      if (locations.length > 0) {

        location = locations.find(loc => loc.addresstype === 'town');

        if (!location) {
          location = locations[0]
        }
      }
    }


    dispatch({
      type: 'SET_CAUSE_FIELD',
      payload: {
        state: uf.value,
        city: city.value,
        latitude: location?.lat,
        longitude: location?.lon,
      },
    });

    redirect('/criar/parabens', RedirectType.push);
  }


  return (
    <SafeArea className="flex justify-center flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Informe a localização</h1>
      <form className="w-full max-w-md " onSubmit={handleSubmit}>

        <AppInput
          title="Estado"
          required
          name="state"
          defaultValue={state.causeStored?.state || ''}
        />
        <AppInput
          title="Cidade"
          required
          name="state"
          defaultValue={state.causeStored?.city || ''}
        />

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Continuar
        </button>
      </form>
    </SafeArea>
  );
};

export default CreateCauseLocation;