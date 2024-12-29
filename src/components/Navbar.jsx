import { Podcast } from "lucide-react";
export default function Navbar() {
  return (
    <div className="flex justify-center md:justify-between items-center  p-4">
      <a href="#!" className="flex items-center font-bold text-3xl md:text-xl">
        <Podcast className="mr-2" />
        Hedraf<span className="text-accent">tech</span>
      </a>

      <ul className="hidden md:flex space-x-4">
        <li>
          <a href="#!" className="btn btn-sm btn-ghost">
            Accueil
          </a>
        </li>
        <li>
          <a href="#!" className="btn btn-sm btn-ghost">
            A propos
          </a>
        </li>
        <li>
          <a href="#!" className="btn btn-sm btn-ghost">
            Mes expériences
          </a>
        </li>
        <li>
          <a href="#!" className="btn btn-sm btn-ghost">
            Mes Projects
          </a>
        </li>
      </ul>
    </div>
  );
}
