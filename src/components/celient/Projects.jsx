import Title from "../Title";
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Github, Video } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mt-10" id="Projects">
      <Title title="Mes Projets" />
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects available at the moment.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-base-300 p-5 h-fit rounded-xl shadow-lg"
            >
              <img
                src={project.image_url || "/placeholder-image.jpg"}
                alt={project.title || "Project Image"}
                className="w-full rounded-xl h-56 object-cover"
              />
              <div>
                <h1 className="my-2 font-bold">{project.title}</h1>
                <p className="text-sm">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 my-2">
                {project.technologies.map((tech, id) => (
                  <span key={id} className="badge badge-accent badge-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex">
                <a
                  href={project.demoLink}
                  className="btn btn-accent w-2/3"
                  aria-label={`View demo of ${project.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                  <Video className="w-4 ml-1" />
                </a>
                <a
                  href={project.repoLink}
                  className="btn btn-neutral w-1/3 ml-2"
                  aria-label={`View repository of ${project.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
