import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects } from '@/contexts/ProjectContext';
import Header from '@/components/Header';
import CommentsSection from '@/components/CommentsSection';
import ActivityLogSection from '@/components/ActivityLogSection';
import { Requirement } from '@/types/project';
import { toast } from 'sonner';

const RequirementDetail = () => {
  const { projectId, requirementId } = useParams();
  const navigate = useNavigate();
  const { projects, updateRequirement } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  
  const project = projects.find(p => p.id === projectId);
  const requirement = project?.requirements.find(r => r.id === requirementId);

  const [editData, setEditData] = useState<Partial<Requirement>>({});

  if (!project || !requirement) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <p className="text-center text-muted-foreground">Requirement not found</p>
        </main>
      </div>
    );
  }

  const startEditing = () => {
    setEditData({
      title: requirement.title,
      reqCode: requirement.reqCode,
      statement: requirement.statement,
      description: requirement.description,
      rationale: requirement.rationale,
      risk: requirement.risk,
      level: requirement.level,
      type: requirement.type,
      status: requirement.status,
      priority: requirement.priority,
    });
    setIsEditing(true);
  };

  const saveChanges = () => {
    updateRequirement(projectId!, requirementId!, editData);
    setIsEditing(false);
    toast.success('Requirement updated');
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({});
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'secondary';
      case 'in-progress': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(`/project/${projectId}`)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {project.name}
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {isEditing ? (
                      <Input
                        value={editData.title || ''}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                        className="text-2xl font-bold"
                        placeholder="Requirement Title"
                      />
                    ) : (
                      <CardTitle className="text-2xl">{requirement.title}</CardTitle>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="font-mono">
                        {isEditing ? (
                          <Input
                            value={editData.reqCode || ''}
                            onChange={(e) => setEditData({ ...editData, reqCode: e.target.value })}
                            className="w-24 h-5 text-xs"
                          />
                        ) : (
                          requirement.reqCode
                        )}
                      </Badge>
                      <Badge variant={getStatusColor(requirement.status)}>{requirement.status}</Badge>
                      <Badge variant={getPriorityColor(requirement.priority)}>{requirement.priority}</Badge>
                      {requirement.risk && (
                        <Badge variant={getRiskColor(requirement.risk)}>Risk: {requirement.risk}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="ghost" size="icon" onClick={cancelEditing}>
                          <X className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={saveChanges}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button variant="outline" size="icon" onClick={startEditing}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Statement</Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.statement || ''}
                      onChange={(e) => setEditData({ ...editData, statement: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-foreground">{requirement.statement}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-muted-foreground text-sm">Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      rows={3}
                    />
                  ) : (
                    <p className="text-foreground">{requirement.description}</p>
                  )}
                </div>

                {(requirement.rationale || isEditing) && (
                  <div className="space-y-2">
                    <Label className="text-muted-foreground text-sm">Rationale</Label>
                    {isEditing ? (
                      <Textarea
                        value={editData.rationale || ''}
                        onChange={(e) => setEditData({ ...editData, rationale: e.target.value })}
                        rows={2}
                      />
                    ) : (
                      <p className="text-foreground">{requirement.rationale}</p>
                    )}
                  </div>
                )}

                {isEditing && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select
                        value={editData.status}
                        onValueChange={(value: any) => setEditData({ ...editData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select
                        value={editData.priority}
                        onValueChange={(value: any) => setEditData({ ...editData, priority: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Level</Label>
                      <Select
                        value={editData.level || ''}
                        onValueChange={(value: any) => setEditData({ ...editData, level: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="subsystem">Subsystem</SelectItem>
                          <SelectItem value="component">Component</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={editData.type || ''}
                        onValueChange={(value: any) => setEditData({ ...editData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="functional">Functional</SelectItem>
                          <SelectItem value="non-functional">Non-functional</SelectItem>
                          <SelectItem value="constraint">Constraint</SelectItem>
                          <SelectItem value="interface">Interface</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Level</p>
                    <p className="font-medium capitalize">{requirement.level || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium capitalize">{requirement.type || 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{requirement.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Updated</p>
                    <p className="font-medium">
                      {requirement.updatedAt?.toLocaleDateString() || 'Never'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <CommentsSection
              comments={requirement.comments}
              onAddComment={(content, parentId) => {
                toast.success('Comment added');
              }}
            />
          </div>

          {/* Sidebar - Activity Log */}
          <div className="space-y-6">
            <ActivityLogSection activities={requirement.activityLog} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default RequirementDetail;
