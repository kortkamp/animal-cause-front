import { SafeArea } from "../SafeArea";

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-white py-4">
      <SafeArea className="w-full flex justify-between items-center px-4">
        <p className="text-sm">© 2025 Causa Animal. Todos direitos reservados.</p>
        <nav>
          <ul className="flex gap-4">
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
          </ul>
        </nav>
      </SafeArea>
    </footer>
  );
}


export { Footer };