
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Users, Calendar, ExternalLink } from "lucide-react";

// Sample data for demonstration
const sampleTests = [
  {
    id: "test1",
    title: "Mobile App Navigation Test",
    projectId: "1",
    projectName: "Mobile App Redesign",
    status: "active",
    participants: 48,
    invites: 100,
    created: "May 15, 2023",
    ending: "May 22, 2023"
  },
  {
    id: "test2",
    title: "Pricing Table A/B Test",
    projectId: "2",
    projectName: "Pricing Page Options",
    status: "completed",
    participants: 127,
    invites: 200,
    created: "April 28, 2023",
    ending: "May 5, 2023"
  },
  {
    id: "test3",
    title: "New Feature Interest Check",
    projectId: "3",
    projectName: "New Feature Concept",
    status: "draft",
    participants: 0,
    invites: 0,
    created: "May 18, 2023",
    ending: "Not started"
  },
  {
    id: "test4",
    title: "Welcome Screen Options",
    projectId: "4",
    projectName: "Onboarding Flow",
    status: "active",
    participants: 32,
    invites: 50,
    created: "May 12, 2023",
    ending: "May 19, 2023"
  }
];

const TestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredTests = sampleTests.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Sessions</h1>
          <p className="text-muted-foreground">
            Manage and track all your feedback collection sessions
          </p>
        </div>
        <Button asChild>
          <Link to="/tests/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Test
          </Link>
        </Button>
      </div>
      
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => (
          <Card key={test.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <Badge className={getStatusColor(test.status)}>
                  {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Project: {test.projectName}
              </p>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{test.participants} / {test.invites} participants</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {test.created}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Ending: {test.ending}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <Link 
                to={`/tests/${test.id}`}
                className="text-swipecheck-blue hover:text-swipecheck-blue/80 text-sm font-medium"
              >
                View Details
              </Link>
              {test.status !== "draft" && (
                <Button variant="outline" size="sm" className="flex items-center gap-1" asChild>
                  <Link to={`/tests/${test.id}/share`}>
                    <ExternalLink className="h-3 w-3" />
                    Share
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestsPage;
