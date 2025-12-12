import { Project } from '@/types/project';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

const ProjectCard = ({ project, onDelete }: ProjectCardProps) => {
  const navigate = useNavigate();

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'completed': return 'secondary';
      case 'on-hold': return 'outline';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{project.name}</CardTitle>
            <CardDescription className="mt-1">{project.description}</CardDescription>
          </div>
          <Badge variant={getStatusColor(project.status)} className="ml-4">
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <p>{project.requirements.length} requirements</p>
            <p>Started: {project.startDate.toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/project/${project.id}/edit`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(project.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
