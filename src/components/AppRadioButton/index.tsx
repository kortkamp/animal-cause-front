import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface AppSelectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  selected: boolean;
  onClick: () => void;
}

const AppRadioButton = ({ className, selected, onClick, children, ...props }: AppSelectProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      {...props}
      className={clsx("rounded-sm p-1 px-2 ring-1",
        selected ? "bg-blue-500 text-white" : "bg-white text-black",
        className)}
    >
      {children}
    </button>
  );
}


export { AppRadioButton }