import { AppInput, AppInputProps } from "."
import { useIMask } from "react-imask";

import { IMaskMixin } from 'react-imask';

const AppPhoneInputBase = IMaskMixin<HTMLInputElement>(({ inputRef, title, ...props }) => (
  <AppInput title={title || ""} {...props} ref={inputRef} />
))

const AppPhoneInput = ({ ...props }: AppInputProps) => {
  const { ref } = useIMask<HTMLInputElement>({ mask: '(00) 00000 0000', overwrite: "shift" }, {
    onAccept: (e, s) => console.log(s._unmaskedValue),
  });

  return <AppInput
    {...props}
    placeholder="(00) 00000 0000"
    ref={ref}
  ></AppInput>
}

export { AppPhoneInput, AppPhoneInputBase }