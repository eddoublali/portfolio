import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useParams, useNavigate } from "react-dom";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: [],
    demoLink: "",
    repoLink: "",
    image_url: "",
  });
  const [newTech, setNewTech] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading true
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Log to verify projectId is received
  useEffect(() => {
    console.log("Project ID from params:", projectId);
  }, [projectId]);

  useEffect(() => {
    async function loadProject() {
      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching project with ID:", projectId);
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", projectId)
          .single();

        if (error) {
          console.error("Error fetching project:", error);
          throw error;
        }

        if (data) {
          console.log("Received project data:", data);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            technologies: Array.isArray(data.technologies) ? data.technologies : [],
            demoLink: data.demoLink || "",
            repoLink: data.repoLink || "",
            image_url: data.image_url || "",
          });
        }
      } catch (error) {
        console.error("Error in loadProject:", error);
        setSubmitStatus(`Error loading project: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  // Log formData changes
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const handleTechInput = (e) => setNewTech(e.target.value);

  const addTechnology = (e) => {
    e.preventDefault();
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, newTech.trim()],
      });
      setNewTech("");
    }
  };

  const removeTechnology = (techToRemove) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((tech) => tech !== techToRemove),
    });
  };

  const handleImageUpload = async (e) => {
    try {
      setUploading(true);
      const file = e.target.files[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      setFormData({ ...formData, image_url: data.publicUrl });
    } catch (error) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("Submitting...");
    console.log("Submitting form with data:", formData);

    try {
      if (projectId) {
        console.log("Updating existing project:", projectId);
        const { error } = await supabase
          .from("projects")
          .update(formData)
          .eq("id", projectId);

        if (error) throw error;
      } else {
        console.log("Creating new project");
        const { error } = await supabase
          .from("projects")
          .insert([formData]);

        if (error) throw error;
      }

      setSubmitStatus("Success!");
      setTimeout(() => {
        navigate("/project");
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="text-center py-4"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-6 bg-[#282a36] text-[#f8f8f2] rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Project Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-white bg-[#282a36] text-[#f8f8f2] shadow-sm focus:border-[#50fa7b] focus:ring-[#50fa7b]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-white bg-[#282a36] text-[#f8f8f2] shadow-sm focus:border-[#50fa7b] focus:ring-[#50fa7b] h-32"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Technologies
        </label>
        <div className="flex gap-2 mt-1">
          <input
            type="text"
            value={newTech}
            onChange={handleTechInput}
            placeholder="Add a technology"
            className="flex-1 rounded-md border border-white bg-[#282a36] text-[#f8f8f2] shadow-sm focus:border-[#50fa7b] focus:ring-[#50fa7b]"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-[#50fa7b] text-[#282a36] rounded-md hover:bg-[#40d97b]"
          >
            Add
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.technologies.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="px-2 py-1 bg-[#44475a] rounded-full text-sm flex items-center gap-1"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="text-[#ff5555] hover:text-[#ff6e6e]"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Demo Link
        </label>
        <input
          type="url"
          name="demoLink"
          value={formData.demoLink}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-white bg-[#282a36] text-[#f8f8f2] shadow-sm focus:border-[#50fa7b] focus:ring-[#50fa7b]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Repository Link
        </label>
        <input
          type="url"
          name="repoLink"
          value={formData.repoLink}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-white bg-[#282a36] text-[#f8f8f2] shadow-sm focus:border-[#50fa7b] focus:ring-[#50fa7b]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6272a4]">
          Project Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 block w-full text-sm border border-white bg-[#282a36] text-[#f8f8f2] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-[#44475a] file:text-[#50fa7b] hover:file:bg-[#6272a4]"
          disabled={uploading}
        />
        {uploading && (
          <p className="mt-2 text-sm text-[#6272a4]">Uploading image...</p>
        )}
        {formData.image_url && (
          <div className="mt-2">
            <img
              src={formData.image_url}
              alt="Preview"
              className="h-32 w-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-[#50fa7b] text-[#282a36] rounded-md hover:bg-[#40d97b] disabled:bg-[#6272a4]"
        disabled={uploading}
      >
        {projectId ? "Update Project" : "Create Project"}
      </button>

      {submitStatus && (
        <p
          className={`mt-2 text-sm ${
            submitStatus.includes("Success")
              ? "text-[#50fa7b]"
              : "text-[#ff5555]"
          }`}
        >
          {submitStatus}
        </p>
      )}
    </form>
  );
}