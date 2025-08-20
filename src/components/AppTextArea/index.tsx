import clsx from "clsx";
import { RefObject, TextareaHTMLAttributes, useEffect, useRef } from "react";

interface AppTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: RefObject<HTMLTextAreaElement | null>
  error?: string
}

const AppTextArea = ({ error = "", onChange = () => { }, ...props }: AppTextAreaProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextArea = () => {
    if (!textAreaRef.current) {
      return;
    }

    textAreaRef.current.style.height = "auto"; // will not work without this!
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 5}px`;
  };

  useEffect(() => {
    resizeTextArea();
    window.addEventListener("resize", resizeTextArea);
  }, []);

  return (
    <div className="flex w-full flex-col">
      <textarea
        {...props}
        className={
          clsx(
            "w-full rounded-md px-4 py-2 border border-gray-500 shadow-gray-500 outline-none",
            "focus:border-gray-800 focus:shadow-input",
            !!error && "border-red-600 focus:border-red-600 shadow-red-500",
          )
        }

        ref={textAreaRef}
        onChange={(e) => {
          resizeTextArea();
          onChange(e)
        }}
      ></textarea>
      <span className='pt-1 text-xs text-red-600 h-6 select-none'>{error}</span>
    </div>
  )


}


export { AppTextArea }