import Title from "./Title";
import { useState, useEffect } from "react";
import { supabase } from "../components/supabaseClient";
import { Pencil, Trash2, Eye, Github, Video } from "lucide-react";
import { useNavigate } from "react-dom";

export default function ProjectsTable() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const { error } = await supabase
        .from("projects")
        .delete()
        .match({ id });

      if (error) {
        console.error("Error deleting project:", error);
      } else {
        fetchProjects();
      }
    }
  };

  return (
    <div className="mt-10 p-6 bg-[#282a36] rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title title="Projects Management" />
        <button 
          onClick={() => navigate("/projectform")}
          className="btn btn-accent"
        >
          Add New Project
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="text-[#6272a4]">
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Technologies</th>
              <th>Links</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="text-[#f8f8f2]">
                <td>
                  <img
                    src={project.image_url || "/placeholder-image.jpg"}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{project.title}</td>
                <td className="max-w-xs truncate">{project.description}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="badge badge-accent badge-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-accent btn-sm"
                    >
                      <Video className="w-4" />
                    </a>
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-neutral btn-sm"
                    >
                      <Github className="w-4" />
                    </a>
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/projectform/${project.id}`)}
                      className="btn btn-info btn-sm"
                    >
                      <Pencil className="w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="btn btn-error btn-sm"
                    >
                      <Trash2 className="w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}