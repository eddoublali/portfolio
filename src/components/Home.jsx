import { Mail } from "lucide-react";
import img from '../assets/img3.jpg'

export default function Home() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-center items-center md:my-32 my-10">
      <div className="flex flex-col">
        <h1 className="text-5xl md:text-6xl font-bold text-center md:text-left mt-4 md:mt-0">
          Bon jour,
          <br />
          je suis <span className="text-accent">Hedraftech</span>
        </h1>
        <p className="my-4 text-md text-center md:text-left">
          Je suis un développeur fullstack <br />
          passionné par la technologie et la programmation.
          <br />
          je combine créativité et expertise technique
          <br />
          pour concevoir des solutions numériques innovantes.
        </p>
        <a href="" className="btn btn-accent md:w-fit">
          <Mail className="w-5 h-5 " />
          Contactez-moi
        </a>
      </div>
      <div className="md:ml-60">
        <img src={img} alt=""  className="w-96 h-96 object-cover border-8 border-accent"
        style={{
            borderRadius:"62% 38% 43% 57% / 34% 34% 66% 66% " 
        }}
        />
      </div>
    </div>
  );
}
