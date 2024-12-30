import Title from "./Title";
import imgCSS from "../assets/techno/css.png";
import imgJS from "../assets/techno/js.png";
import imgREACT from "../assets/techno/react.png";
import imgHTML from "../assets/techno/html.png";
import imgNODE from "../assets/techno/node-js.png";
import imgTYPE from "../assets/techno/typescript.svg";
import imgTAILWIND from "../assets/techno/tailwind.png";
import imgPhp from "../assets/techno/php.jpg";
import imgLaravel from "../assets/techno/laravel.jpeg";
import imgMysql from "../assets/techno/mysql.jpg";
import imgMongo from "../assets/techno/mongodb.jpeg";
import imgBootstrap from "../assets/techno/bootstrap.png"

export default function Experiences() {
  const skills = [
    { id: 1, name: "HTML", image: imgHTML },
    { id: 2, name: "CSS", image: imgCSS },
    { id: 3, name: "Bootstrap", image: imgBootstrap },
    { id: 4, name: "Tailwind CSS", image: imgTAILWIND },
    { id: 5, name: "JavaScript", image: imgJS },
    { id: 6, name: "TypeScript", image: imgTYPE },
    { id: 7, name: "React", image: imgREACT },
    { id: 8, name: "Node.js", image: imgNODE },
    { id: 9, name: "PHP", image: imgPhp },
    { id: 10, name: "Laravel", image: imgLaravel },
    { id: 11, name: "Mysql", image: imgMysql },
    { id: 12, name: "MongoDB", image: imgMongo },
    
  ];
  return (
    <div id="Experiences">
      <Title title="les technologies" />
      <div>
        <div className="flex flex-wrap gap-2 justify-center items-center  mt:w-4 md:mt-0 p-10">
          {skills.map((skill) => (
            <div key={skill.id} className="flex jsutify-center items-center flex-col">
             <div className="w-24 h-24 p-2 rounded-full border-2 border-accent">
                <img src={skill.image} alt={skill.name} className="object-cover rounded-full h-full w-full" />
             </div>
             <span className="mt-2 text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
