import { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { getStateCities } from '@/services/geolocationService';

export interface AutocompleteInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  title?: string;
  error?: string
  appendLeft?: ReactNode
  labelVariant?: 'lg'
  uf: string;
  value: string
}

const AutocompleteCityInput = ({ className, uf, labelVariant, appendLeft, title, error = "", value, onChange = () => { }, ...props }: AutocompleteInputProps) => {

  const [cities, setCities] = useState<string[]>([])

  console.log(uf, value)

  const handleSuggestionClick = (suggestion: string) => {
    onChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    getStateCities(uf).then(response => {
      setCities(response);
    })
  }, [uf])

  const filtered = cities.filter(item =>
    item.toLowerCase().includes(value.toLowerCase())
  );

  console.log(value, filtered);

  const showSuggestions = value.length > 1 && filtered.length > 0 && (filtered[0] !== value);

  return (
    <div
      className={
        clsx("flex flex-col rounded-md", className)}
    >
      <label htmlFor="" className={clsx(
        'pb-2 font-semibold text-gray-600',
        labelVariant === 'lg' && 'text-xl'
      )}>{title}</label>
      <div className='w-full flex flex-col'>
        {appendLeft}
        <input
          {...props}
          value={value}
          onChange={(e) => {
            // handleInputChange(e);
            onChange(e)
          }}
          className={
            clsx(
              "rounded-md p-1 px-4 py-3 border border-gray-500 shadow-gray-500 outline-none w-full",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              "focus:border-gray-800 focus:shadow-input",
              !!error && "border-red-600 focus:border-red-600 shadow-red-500",
              !!appendLeft && "rounded-l-none"
            )
          } />
        <div className='relative'>
          {showSuggestions && (
            <ul className="absolute bg-white w-full top-0 z-10 rounded-md px-4 py-2 border border-gray-500 text-default-light">
              {filtered.slice(0, 10).map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion)} className='cursor-pointer hover:text-black'>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <span className='pt-1 text-xs text-red-600 h-6 select-none'>{error}</span>
    </div>
  );
};

export { AutocompleteCityInput };