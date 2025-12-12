export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
  parentId?: string;
  replies?: Comment[];
}

export interface ActivityLog {
  id: string;
  action: 'created' | 'edited' | 'deleted' | 'status_changed' | 'assigned' | 'commented';
  performedBy: string;
  performedByAvatar?: string;
  timestamp: Date;
  details?: string;
  changes?: { field: string; from: string; to: string }[];
}

export interface Requirement {
  id: string;
  reqCode: string;
  title: string;
  statement: string;
  description: string;
  rationale?: string;
  risk?: 'low' | 'medium' | 'high' | 'critical';
  level?: 'system' | 'subsystem' | 'component';
  type?: 'functional' | 'non-functional' | 'constraint' | 'interface';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt?: Date;
  comments: Comment[];
  activityLog: ActivityLog[];
}

export interface TeamMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  joinedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'on-hold' | 'completed';
  startDate: Date;
  requirements: Requirement[];
  team: TeamMember[];
  comments: Comment[];
  activityLog: ActivityLog[];
  createdAt: Date;
  deletedAt?: Date;
}
