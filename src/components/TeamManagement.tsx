import { useState } from 'react';
import { UserPlus, X, Crown, Shield, Edit3, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TeamMember } from '@/types/project';
import { toast } from 'sonner';

interface TeamManagementProps {
  team: TeamMember[];
  isOwner: boolean;
  onAddMember: (email: string) => void;
  onRemoveMember: (memberId: string) => void;
  onUpdateRole: (memberId: string, role: TeamMember['role']) => void;
}

const getRoleIcon = (role: TeamMember['role']) => {
  switch (role) {
    case 'owner':
      return <Crown className="h-3 w-3" />;
    case 'admin':
      return <Shield className="h-3 w-3" />;
    case 'editor':
      return <Edit3 className="h-3 w-3" />;
    case 'viewer':
      return <Eye className="h-3 w-3" />;
  }
};

const getRoleBadgeVariant = (role: TeamMember['role']) => {
  switch (role) {
    case 'owner':
      return 'default';
    case 'admin':
      return 'secondary';
    case 'editor':
      return 'outline';
    case 'viewer':
      return 'outline';
    default:
      return 'outline';
  }
};

const TeamManagement = ({
  team,
  isOwner,
  onAddMember,
  onRemoveMember,
  onUpdateRole,
}: TeamManagementProps) => {
  const [newEmail, setNewEmail] = useState('');

  const handleAddMember = () => {
    if (newEmail.trim() && newEmail.includes('@')) {
      onAddMember(newEmail);
      setNewEmail('');
      toast.success('Team member invited');
    } else {
      toast.error('Please enter a valid email');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Team Members ({team.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isOwner && (
          <div className="flex gap-2">
            <Input
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter email to invite..."
              type="email"
              onKeyPress={(e) => e.key === 'Enter' && handleAddMember()}
            />
            <Button onClick={handleAddMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        )}

        <div className="divide-y divide-border">
          {team.map((member) => (
            <div key={member.id} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{member.name}</span>
                    <Badge
                      variant={getRoleBadgeVariant(member.role)}
                      className="flex items-center gap-1"
                    >
                      {getRoleIcon(member.role)}
                      {member.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>

              {isOwner && member.role !== 'owner' && (
                <div className="flex items-center gap-2">
                  <Select
                    value={member.role}
                    onValueChange={(value: TeamMember['role']) => onUpdateRole(member.id, value)}
                  >
                    <SelectTrigger className="w-28">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveMember(member.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {member.role === 'owner' && (
                <span className="text-sm text-muted-foreground">Project Owner</span>
              )}
            </div>
          ))}
        </div>

        {team.length === 0 && (
          <div className="text-center py-6">
            <UserPlus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No team members yet</p>
            <p className="text-sm text-muted-foreground">Invite teammates to collaborate</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamManagement;
