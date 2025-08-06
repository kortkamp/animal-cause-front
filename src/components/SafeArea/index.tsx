import { ReactNode } from 'react';

interface SafeAreaProps {
  children?: ReactNode | ReactNode[];
  className?: string;
}

const SafeArea = ({ children, className = '' }: SafeAreaProps) => (
  <div
    className={`mx-auto w-full max-w-[1024px] max-lg:max-w-5xl max-lg:px-5 max-md:px-3 xl:max-w-7xl ${className}`}
  >
    {children}
  </div>
);

export { SafeArea };