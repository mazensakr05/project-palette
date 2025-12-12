import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProjects } from '@/contexts/ProjectContext';
import Header from '@/components/Header';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const DeletedProjects = () => {
  const { deletedProjects, restoreProject, permanentlyDeleteProject } = useProjects();

  const handleRestore = (id: string) => {
    restoreProject(id);
    toast.success('Project restored successfully');
  };

  const handlePermanentDelete = (id: string) => {
    permanentlyDeleteProject(id);
    toast.success('Project permanently deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Deleted Projects</h1>
              <p className="text-muted-foreground mt-1">Restore or permanently delete your projects</p>
            </div>
          </div>
        </div>

        {deletedProjects.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Trash2 className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">No deleted projects</p>
              <p className="text-sm text-muted-foreground text-center mt-1">
                Projects you delete will appear here for recovery
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {deletedProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {project.name}
                        <Badge variant="outline" className="text-destructive border-destructive/50">
                          Deleted
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <p>Deleted: {project.deletedAt?.toLocaleDateString()}</p>
                      <p>{project.requirements.length} requirements</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRestore(project.id)}
                        className="text-success hover:text-success hover:bg-success/10"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Restore
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Forever
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="flex items-center gap-2">
                              <AlertTriangle className="h-5 w-5 text-destructive" />
                              Permanently Delete Project?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the project
                              "{project.name}" and all of its requirements.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handlePermanentDelete(project.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete Forever
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeletedProjects;
