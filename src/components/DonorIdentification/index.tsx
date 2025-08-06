import { Dispatch, SetStateAction } from "react";
import { AppInput } from "../AppInput"

interface IdentificationData {
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

interface DonorIdentificationProps {
  identificationData: IdentificationData;
  setIdentificationData: Dispatch<SetStateAction<IdentificationData>>
}

const DonorIdentification = ({ identificationData, setIdentificationData }: DonorIdentificationProps) => {

  const handleInputChange = (name: keyof IdentificationData, value: string) => {
    setIdentificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <AppInput
        value={identificationData.phone}
        onChange={e => handleInputChange('phone', e.target.value)}
        title="Telefone (WhatsApp)"
        type="text"
        className="w-full sm:w-5/12" />
      <AppInput
        value={identificationData.email}
        onChange={e => handleInputChange('email', e.target.value)}
        title="E-mail" type="email"
        className="w-full sm:w-6/12" />
      <AppInput
        value={identificationData.cpf}
        onChange={e => handleInputChange('cpf', e.target.value)}
        title="CPF" type="text"
        className="w-full sm:w-4/12" />
      <AppInput
        value={identificationData.name}
        onChange={e => handleInputChange('name', e.target.value)}
        title="Nome completo" type="text"
        className="w-full sm:w-7/12" />
    </div>
  );
}

export { DonorIdentification }