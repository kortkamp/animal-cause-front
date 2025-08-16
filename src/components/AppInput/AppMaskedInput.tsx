import { AppInput } from "."
import { IMaskMixin } from 'react-imask';

const AppMaskedInput = IMaskMixin<HTMLInputElement>(({ inputRef, title, ...props }) => (
  <AppInput title={title || ""} {...props} ref={inputRef} />
))

export { AppMaskedInput }