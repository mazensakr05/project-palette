import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjects } from '@/contexts/ProjectContext';
import Header from '@/components/Header';
import RequirementForm from '@/components/RequirementForm';
import RequirementList from '@/components/RequirementList';
import TeamManagement from '@/components/TeamManagement';
import CommentsSection from '@/components/CommentsSection';
import ActivityLogSection from '@/components/ActivityLogSection';
import { toast } from 'sonner';
import { Requirement } from '@/types/project';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, addRequirement, updateRequirement, deleteRequirement, addTeamMember, removeTeamMember, updateTeamMember } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRequirement, setEditingRequirement] = useState<Requirement | undefined>();

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

  const handleAddRequirement = (data: any) => {
    addRequirement(id!, {
      ...data,
      reqCode: `REQ-${String(project.requirements.length + 1).padStart(3, '0')}`,
      statement: data.description,
    });
    toast.success('Requirement added');
    setIsFormOpen(false);
  };

  const handleEditRequirement = (data: any) => {
    if (editingRequirement) {
      updateRequirement(id!, editingRequirement.id, data);
      toast.success('Requirement updated');
      setEditingRequirement(undefined);
      setIsFormOpen(false);
    }
  };

  const handleDeleteRequirement = (requirementId: string) => {
    deleteRequirement(id!, requirementId);
    toast.success('Requirement deleted');
  };

  const openEditForm = (requirement: Requirement) => {
    setEditingRequirement(requirement);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingRequirement(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <CardDescription className="mt-2">{project.description}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>{project.status}</Badge>
                <Button variant="outline" size="sm" onClick={() => navigate(`/project/${id}/edit`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              <p>Start Date: {project.startDate.toLocaleDateString()}</p>
              <p>Created: {project.createdAt.toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="requirements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="requirements">
            <RequirementList
              projectId={id!}
              requirements={project.requirements}
              onEdit={openEditForm}
              onDelete={handleDeleteRequirement}
              onAdd={() => setIsFormOpen(true)}
            />
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement
              team={project.team}
              isOwner={true}
              onAddMember={(email) => addTeamMember(id!, { userId: Date.now().toString(), name: email.split('@')[0], email, role: 'viewer' })}
              onRemoveMember={(memberId) => removeTeamMember(id!, memberId)}
              onUpdateRole={(memberId, role) => updateTeamMember(id!, memberId, { role })}
            />
          </TabsContent>

          <TabsContent value="comments">
            <CommentsSection comments={project.comments} onAddComment={() => toast.success('Comment added')} />
          </TabsContent>

          <TabsContent value="activity">
            <ActivityLogSection activities={project.activityLog} />
          </TabsContent>
        </Tabs>

        <RequirementForm
          requirement={editingRequirement}
          open={isFormOpen}
          onClose={closeForm}
          onSubmit={editingRequirement ? handleEditRequirement : handleAddRequirement}
        />
      </main>
    </div>
  );
};

export default ProjectDetail;
