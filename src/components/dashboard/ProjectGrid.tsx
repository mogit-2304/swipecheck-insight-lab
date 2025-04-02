
import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  responses: number;
  created: string;
}

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          description={project.description}
          status={project.status}
          responses={project.responses}
          created={project.created}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
