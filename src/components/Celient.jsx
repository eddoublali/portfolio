import Experiences from "./celient/Experiences";
import Home from "./celient/Home";
import Projects from "./celient/Projects";
import About from "./celient/About";
export default function App() {
  return (
    <div>
       <div className="p-5 md:px-[15%]">
    
          <Home />
       </div>
       <About/>
       <div className="p-5 md:px-[15%]">
         <Experiences/>
         <Projects/>
       </div>

    </div>

    
  )
}