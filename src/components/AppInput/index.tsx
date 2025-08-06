import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
}

const AppInput = ({ className, title, ...props }: AppInputProps) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <label htmlFor="">{title}</label>
      <input {...props} className="rounded-sm p-1 px-2 ring-1" />
    </div>
  );
};

export { AppInput };