/* eslint-disable @next/next/no-html-link-for-pages */
import { AuthButton } from "../AuthButton";
import { SafeArea } from "../SafeArea";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <SafeArea className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Causa Animal</h1>
        <nav className="">
          <ul className="flex gap-4 items-center justify-between">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/criar" className="hover:underline">Criar uma Causa</a></li>
            <li className="flex"><AuthButton></AuthButton></li>
          </ul>
        </nav>
      </SafeArea>
    </header>
  );
}

export { Header };