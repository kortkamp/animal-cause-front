import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

export interface AppInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title: string;
  error?: string
  appendLeft?: ReactNode
}

const AppInput = ({ className, appendLeft, title, error = "", ...props }: AppInputProps) => {

  return (
    <div
      className={
        clsx("flex flex-col rounded-md", className)}
    >
      <label htmlFor="" className='pb-2 font-semibold text-gray-600'>{title}</label>
      <div className='w-full flex'>
        {appendLeft}
        <input
          {...props}
          className={
            clsx(
              "rounded-md p-1 px-4 py-3 border border-gray-500 shadow-gray-500 outline-none w-full",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              "focus:border-gray-800 focus:shadow-input",
              !!error && "border-red-600 focus:border-red-600 shadow-red-500",
              !!appendLeft && "rounded-l-none"
            )
          } />
      </div>
      <span className='pt-1 text-xs text-red-600 h-6 select-none'>{error}</span>
    </div>
  );
};

export { AppInput };