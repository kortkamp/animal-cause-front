import { Dispatch, SetStateAction } from "react";
import { AppInput } from "../AppInput"
import { AppCpfInput } from "../AppInput/AppCpfInput";
import { AppMaskedInput } from "../AppInput/AppMaskedInput";
import { UseFormRegister } from "react-hook-form";

export interface IdentificationData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface DonorIdentificationProps {
  identificationData?: IdentificationData;
  setIdentificationData?: Dispatch<SetStateAction<IdentificationData>>;
  errors?: Record<keyof IdentificationData, string>;
  register: UseFormRegister<IdentificationData>
}

const DonorIdentification = ({ errors }: DonorIdentificationProps) => {
  const handleInputChange = (name: keyof IdentificationData, value: string) => {
    // setIdentificationData(prev => ({
    //   ...prev,
    //   [name]: value
    // }));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <AppMaskedInput
        name="phone"
        // inputRef={ref}
        // onAccept={(e: string) => handleInputChange('phone', e)}
        title="Telefone (WhatsApp)"
        mask='(00) 00000 0000'
        placeholder="(00) 00000 0000"
        unmask
        error={errors?.phone}
        className="w-full sm:w-5/12" />
      <AppInput
        name="email"
        // value={identificationData.email}
        // onChange={e => handleInputChange('email', e.target.value)}
        title="E-mail" type="email"
        error={errors?.email}
        className="w-full sm:w-6/12" />
      <AppCpfInput
        name="cpf"
        // onChange={e => handleInputChange('cpf', e.target.value)}
        title="CPF" type="text"
        error={errors?.cpf}
        className="w-full sm:w-4/12" />
      <AppInput
        name="name"
        // value={identificationData.name}
        // onChange={e => handleInputChange('name', e.target.value)}
        title="Nome completo" type="text"
        error={errors?.name}
        className="w-full sm:w-7/12" />
    </div>
  );
}

export { DonorIdentification }