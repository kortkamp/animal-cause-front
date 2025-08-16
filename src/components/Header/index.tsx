/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { AuthButton } from "../AuthButton";
import { SafeArea } from "../SafeArea";
import { Logo } from "../Logo";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <SafeArea className="flex justify-between items-center px-4">
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="">
          <ul className="flex gap-4 items-center justify-between">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/causas" className="hover:underline">Causas</a></li>
            <li><a href="/criar" className="hover:underline">Criar uma Causa</a></li>
            <li className="flex"><AuthButton></AuthButton></li>
          </ul>
        </nav>
      </SafeArea>
    </header>
  );
}

export { Header };