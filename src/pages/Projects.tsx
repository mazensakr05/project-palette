import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/contexts/ProjectContext';
import ProjectCard from '@/components/ProjectCard';
import Header from '@/components/Header';
import { toast } from 'sonner';

const Projects = () => {
  const navigate = useNavigate();
  const { projects, deleteProject } = useProjects();

  const handleDelete = (id: string) => {
    deleteProject(id);
    toast.success('Project deleted successfully');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage your projects and requirements</p>
          </div>
          <Button onClick={() => navigate('/project/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No projects yet</p>
            <Button onClick={() => navigate('/project/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Projects;
