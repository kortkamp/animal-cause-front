'use client'

import clsx from "clsx";
import { MouseEventHandler, useEffect, useState } from "react";

interface Props {
  content: string
}

const ClickCopyIcon = ({ content }: Props) => {

  const [isClicked, setIsClicked] = useState(false)

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(content);
    setIsClicked(true);
  }

  useEffect(() => {
    if (!isClicked) {
      return
    }

    const timer = setTimeout(() => setIsClicked(false), 1500)

    return (() => clearTimeout(timer))

  }, [isClicked])

  return (
    <button onClick={handleClick} className="relative">
      <div className={clsx(
        "bg-black p-2 w-20 rounded absolute text-white right-6 -bottom-2 transition-all opacity-0",
        isClicked && "opacity-100"

      )}>Copiado!</div>
      <svg
        className="fill-default-light hover:fill-default cursor-pointer"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        width={24}
        height={24}
      >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"></path>
      </svg>
    </button>
  )
}


export { ClickCopyIcon }