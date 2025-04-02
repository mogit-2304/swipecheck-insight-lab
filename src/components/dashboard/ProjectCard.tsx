
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Clock, Users } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  status: "draft" | "active" | "completed";
  responses: number;
  created: string;
}

const ProjectCard = ({
  id,
  title,
  description,
  status,
  responses,
  created
}: ProjectCardProps) => {
  const statusColors = {
    draft: "bg-muted text-muted-foreground",
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800"
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{responses} responses</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Created {created}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link 
          to={`/projects/${id}`}
          className="text-swipecheck-blue hover:text-swipecheck-blue/80 text-sm font-medium flex items-center gap-1"
        >
          <BarChart className="h-4 w-4" />
          View Results
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
