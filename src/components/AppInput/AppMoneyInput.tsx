import { AppInput, AppInputProps } from "."
import { useIMask } from "react-imask";


const AppMoneyInput = ({ ...props }: AppInputProps) => {
  const { ref } = useIMask<HTMLInputElement>({ scale: 2, min: 0, mask: Number, padFractionalZeros: true });

  return <AppInput
    {...props}
    appendLeft={(<div className="bg-gray-200 flex items-center px-4 rounded-l-md border-gray-500 border border-r-0">R$</div>)}
    ref={ref}
  ></AppInput>
}

export { AppMoneyInput }