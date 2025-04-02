
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import ProjectGrid from "@/components/dashboard/ProjectGrid";

// Sample data for demonstration
const sampleProjects = [
  {
    id: "1",
    title: "Mobile App Redesign",
    description: "Testing new navigation concepts for our mobile application",
    status: "active" as const,
    responses: 48,
    created: "2 days ago"
  },
  {
    id: "2",
    title: "Pricing Page Options",
    description: "Evaluating different pricing page layouts and presentations",
    status: "completed" as const,
    responses: 127,
    created: "1 week ago"
  },
  {
    id: "3",
    title: "New Feature Concept",
    description: "Validating interest in our upcoming collaboration features",
    status: "draft" as const,
    responses: 0,
    created: "1 day ago"
  },
  {
    id: "4",
    title: "Onboarding Flow",
    description: "Testing different onboarding experiences for new users",
    status: "active" as const,
    responses: 32,
    created: "3 days ago"
  },
  {
    id: "5",
    title: "Landing Page Redesign",
    description: "Testing various landing page designs to improve conversion",
    status: "active" as const,
    responses: 89,
    created: "5 days ago"
  },
  {
    id: "6",
    title: "Feature Prioritization",
    description: "Collecting feedback on which features to build next",
    status: "completed" as const,
    responses: 215,
    created: "2 weeks ago"
  }
];

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProjects = sampleProjects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage and view all your validation projects
          </p>
        </div>
        <Button asChild>
          <Link to="/projects/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>
      
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <ProjectGrid projects={filteredProjects} />
    </div>
  );
};

export default ProjectsPage;
