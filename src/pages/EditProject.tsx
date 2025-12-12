import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectForm from '@/components/ProjectForm';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject } = useProjects();
  
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground">Project not found</p>
        </main>
      </div>
    );
  }

  const handleSubmit = (data: any) => {
    updateProject(id!, {
      name: data.name,
      description: data.description,
      status: data.status,
      startDate: new Date(data.startDate),
    });
    toast.success('Project updated successfully');
    navigate(`/project/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/project/${id}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Project
        </Button>
        <div className="max-w-2xl mx-auto">
          <ProjectForm
            project={project}
            onSubmit={handleSubmit}
            onCancel={() => navigate(`/project/${id}`)}
          />
        </div>
      </main>
    </div>
  );
};

export default EditProject;
