'use client';
import { useAppStore } from "@/store";
import Link from "next/link";


const LogInButton = () => {
  return (
    <Link className="" href={"/entrar"}>
      Entrar
    </Link>
  );
}

const UserButton = ({ name, onclick }: { name: string, onclick: () => void }) => {
  return (
    <button type="button" onClick={onclick} className="flex items-center gap-2 cursor-pointer rounded-full bg-green-500 p-1">
      <span>{name.slice(0, 2)}</span>
    </button>
  );

}


const AuthButton = () => {

  const [state, dispatch] = useAppStore()

  const handleLogout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (
    <div>
      {state.isAuthenticated ? <UserButton onclick={handleLogout} name={state.user?.name || ""} /> : <LogInButton />}
    </div>
  );
}

export { AuthButton };