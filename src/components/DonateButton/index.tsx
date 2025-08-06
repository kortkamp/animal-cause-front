import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface DonateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
}


const DonateButton = ({ type = "button", disabled, className, ...props }: DonateButtonProps) => {
  return (
    <button type={type} {...props} disabled={disabled} className={clsx(
      "bg-primary text-white font-bold py-2 px-4 rounded cursor-pointer",
      "hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    >
      Doar
    </button>
  );
}

export { DonateButton };