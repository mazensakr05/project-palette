import { useNavigate } from 'react-router-dom';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectForm from '@/components/ProjectForm';
import Header from '@/components/Header';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewProject = () => {
  const navigate = useNavigate();
  const { addProject } = useProjects();

  const handleSubmit = (data: any) => {
    addProject({
      name: data.name,
      description: data.description,
      status: data.status,
      startDate: new Date(data.startDate),
    });
    toast.success('Project created successfully');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <div className="max-w-2xl mx-auto">
          <ProjectForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/')}
          />
        </div>
      </main>
    </div>
  );
};

export default NewProject;
