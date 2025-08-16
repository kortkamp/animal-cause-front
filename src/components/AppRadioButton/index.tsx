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
      className={
        clsx(
          "rounded-md p-2 border border-primary flex items-center gap-2 hover:bg-primary-dark hover:text-white cursor-pointer",
          selected ? "bg-primary text-white" : "bg-white text-primary",
          className
        )}
    >
      <div className={
        clsx(
          'h-4 w-4 rounded-full border bg-transparent flex items-center justify-center select-none',
          selected ? "border-white" : "border-primary"
        )
      }>
        {selected &&
          <div className='h-2 w-2 bg-white rounded-full'></div>
        }
      </div>
      {children}
    </button>
  );
}


export { AppRadioButton }