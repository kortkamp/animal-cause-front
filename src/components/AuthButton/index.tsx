/* eslint-disable @next/next/no-img-element */
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

const UserButton = ({ url, onclick }: { url: string, onclick: () => void }) => {
  return (
    <button type="button" onClick={onclick} className="rounded-full overflow-hidden">
      <img src={url} alt="avatar image" className="h-10 w-10" />
    </button>
  );

}


const AuthButton = () => {

  const [state, dispatch] = useAppStore()

  const handleLogout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  return (

    state.isAuthenticated ?
      <UserButton onclick={handleLogout} url={state.user?.avatar?.url || ""} />
      : <LogInButton />

  );
}

export { AuthButton };