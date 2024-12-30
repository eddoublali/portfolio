import { Linkedin, Origami, Podcast, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div>
      <footer className="footer footer-center  p-10">
        <aside>
          <a
            href="#!"
            className="flex items-center font-bold text-3xl md:text-xl"
          >
            <Podcast className="w-10 h-10" />
          </a>
          <p className="font-bold">
            Hedraf<span className="text-accent">tech</span>
          </p>
          <p>Copyright © {new Date().getFullYear()} - Tous drois réservés</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.youtube.com/@Hedraftech"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://ma.linkedin.com/in/zakarya-eddoublali-79b2b7232"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://www.freelancer.com/u/zakaryamotion"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Origami className="w-6 h-6"  /> 
            </a>
           
          </div>
        </nav>
      </footer>
    </div>
  );
}
