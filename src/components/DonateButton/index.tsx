import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { Spinner } from "../Spinner";

interface DonateButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  variant?: 'lg' | 'md',
  isLoading?: boolean
}


const DonateButton = ({ type = "button", isLoading, variant = 'md', className, children, ...props }: DonateButtonProps) => {
  return (
    <button type={type} {...props} disabled={isLoading} className={clsx(
      "bg-primary text-white font-bold py-2 px-4 rounded-lg cursor-pointer transition relative flex justify-center",
      "hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      variant == 'lg' && "text-xl py-3 px-6",
      className
    )
    }
    >
      {isLoading ?
        <Spinner></Spinner> : (children || 'Doar')}
    </button >
  );
}

export { DonateButton };