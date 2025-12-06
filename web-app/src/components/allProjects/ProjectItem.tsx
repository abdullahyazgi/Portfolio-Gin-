import { models_Project } from "@/api.types.d.ts";

interface ProjectItemProps {
  project: models_Project;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  return (
    <div>
      <h3>{project.title}</h3>
      <p>
        {project.description}
      </p>
    </div>
  );
};

export default ProjectItem;