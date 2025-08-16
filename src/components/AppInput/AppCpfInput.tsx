import { AppInput, AppInputProps } from "."
import { useIMask } from "react-imask";

const AppCpfInput = ({ ...props }: AppInputProps) => {
  const { ref } = useIMask<HTMLInputElement>({ mask: '000.000.000-00', overwrite: "shift" });

  return <AppInput
    {...props}
    placeholder="000.000.000-00"
    ref={ref}
  ></AppInput>
}

export { AppCpfInput }