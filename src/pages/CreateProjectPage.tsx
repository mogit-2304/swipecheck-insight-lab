
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import CreateProjectForm from "@/components/projects/CreateProjectForm";

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCreateProject = (data: any) => {
    console.log("New project data:", data);
    
    // In a real application, this would connect to a backend
    // For now, we'll simulate success and redirect
    
    toast({
      title: "Project created",
      description: "Your project has been created successfully",
    });
    
    // Redirect to projects page
    navigate("/projects");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Create New Project</h1>
        <p className="text-muted-foreground mb-8">
          Create a new validation project to collect feedback on your product ideas
        </p>
        
        <CreateProjectForm onSubmit={handleCreateProject} />
      </div>
    </div>
  );
};

export default CreateProjectPage;
