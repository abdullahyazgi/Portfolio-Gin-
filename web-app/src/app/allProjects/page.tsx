"use client";

import { useEffect, useState } from "react";
import { models_Project } from "@/api.types.d.ts";
import { getProjects } from "@/apiCalls/projectApiCall";
import ProjectItem from "@/components/allProjects/ProjectItem";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<models_Project[]>([]);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>My Projects</h2>

      <ul>
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectsPage;
