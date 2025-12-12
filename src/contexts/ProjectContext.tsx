import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Project, Requirement, Comment, ActivityLog, TeamMember } from '@/types/project';

interface ProjectContextType {
  projects: Project[];
  deletedProjects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'requirements' | 'team' | 'comments' | 'activityLog'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  restoreProject: (id: string) => void;
  permanentlyDeleteProject: (id: string) => void;
  addRequirement: (projectId: string, requirement: Omit<Requirement, 'id' | 'createdAt' | 'comments' | 'activityLog'>) => void;
  updateRequirement: (projectId: string, requirementId: string, requirement: Partial<Requirement>) => void;
  deleteRequirement: (projectId: string, requirementId: string) => void;
  addTeamMember: (projectId: string, member: Omit<TeamMember, 'id' | 'joinedAt'>) => void;
  updateTeamMember: (projectId: string, memberId: string, member: Partial<TeamMember>) => void;
  removeTeamMember: (projectId: string, memberId: string) => void;
  addComment: (projectId: string, requirementId: string | null, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const mockActivityLog: ActivityLog[] = [
  {
    id: '1',
    action: 'created',
    performedBy: 'John Doe',
    performedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    timestamp: new Date('2024-01-10'),
    details: 'Created requirement',
  },
  {
    id: '2',
    action: 'edited',
    performedBy: 'Jane Smith',
    performedByAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    timestamp: new Date('2024-01-15'),
    details: 'Updated description',
    changes: [{ field: 'description', from: 'Old description', to: 'New description' }],
  },
];

const mockComments: Comment[] = [
  {
    id: '1',
    authorId: 'user1',
    authorName: 'John Doe',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    content: 'This looks good! Let me know when its ready for review.',
    createdAt: new Date('2024-01-12'),
    replies: [
      {
        id: '2',
        authorId: 'user2',
        authorName: 'Jane Smith',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
        content: 'Will do! Just finishing up the last changes.',
        createdAt: new Date('2024-01-12'),
        parentId: '1',
      },
    ],
  },
];

const mockTeam: TeamMember[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'owner',
    joinedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
    role: 'admin',
    joinedAt: new Date('2024-01-11'),
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    role: 'editor',
    joinedAt: new Date('2024-01-12'),
  },
];

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      status: 'active',
      startDate: new Date('2024-01-15'),
      createdAt: new Date('2024-01-10'),
      team: mockTeam,
      comments: mockComments,
      activityLog: mockActivityLog,
      requirements: [
        {
          id: '1',
          reqCode: 'REQ-001',
          title: 'Responsive Design',
          statement: 'The website shall be fully responsive across all device sizes.',
          description: 'Website must be mobile-friendly and adapt to different screen sizes.',
          rationale: 'To ensure accessibility for all users regardless of device.',
          risk: 'medium',
          level: 'system',
          type: 'non-functional',
          status: 'completed',
          priority: 'high',
          createdAt: new Date('2024-01-11'),
          updatedAt: new Date('2024-01-20'),
          comments: mockComments,
          activityLog: mockActivityLog,
        },
        {
          id: '2',
          reqCode: 'REQ-002',
          title: 'SEO Optimization',
          statement: 'The website shall implement SEO best practices.',
          description: 'Implement meta tags, structured data, and performance optimizations.',
          rationale: 'To improve search engine rankings and organic traffic.',
          risk: 'low',
          level: 'system',
          type: 'non-functional',
          status: 'in-progress',
          priority: 'high',
          createdAt: new Date('2024-01-12'),
          comments: [],
          activityLog: mockActivityLog,
        },
        {
          id: '3',
          reqCode: 'REQ-003',
          title: 'User Authentication',
          statement: 'The system shall provide secure user authentication.',
          description: 'Implement login, registration, and password recovery functionality.',
          rationale: 'To protect user data and provide personalized experiences.',
          risk: 'high',
          level: 'subsystem',
          type: 'functional',
          status: 'pending',
          priority: 'high',
          createdAt: new Date('2024-01-13'),
          comments: [],
          activityLog: [],
        },
      ],
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Native mobile application for iOS and Android',
      status: 'active',
      startDate: new Date('2024-02-01'),
      createdAt: new Date('2024-01-25'),
      team: mockTeam.slice(0, 2),
      comments: [],
      activityLog: mockActivityLog,
      requirements: [
        {
          id: '1',
          reqCode: 'REQ-001',
          title: 'User Authentication',
          statement: 'The mobile app shall support user authentication.',
          description: 'Secure login system with biometric support.',
          rationale: 'To ensure secure access to user data.',
          risk: 'high',
          level: 'system',
          type: 'functional',
          status: 'pending',
          priority: 'high',
          createdAt: new Date('2024-01-26'),
          comments: [],
          activityLog: [],
        },
      ],
    },
  ]);

  const [deletedProjects, setDeletedProjects] = useState<Project[]>([
    {
      id: '3',
      name: 'Legacy System Migration',
      description: 'Migration of legacy systems to cloud infrastructure',
      status: 'on-hold',
      startDate: new Date('2023-06-01'),
      createdAt: new Date('2023-05-15'),
      deletedAt: new Date('2024-01-01'),
      team: [],
      comments: [],
      activityLog: [],
      requirements: [],
    },
  ]);

  const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'requirements' | 'team' | 'comments' | 'activityLog'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
      createdAt: new Date(),
      requirements: [],
      team: [],
      comments: [],
      activityLog: [
        {
          id: Date.now().toString(),
          action: 'created',
          performedBy: 'Current User',
          timestamp: new Date(),
          details: 'Project created',
        },
      ],
    };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedProject } : p));
  };

  const deleteProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setDeletedProjects([...deletedProjects, { ...project, deletedAt: new Date() }]);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const restoreProject = (id: string) => {
    const project = deletedProjects.find(p => p.id === id);
    if (project) {
      const { deletedAt, ...restoredProject } = project;
      setProjects([...projects, restoredProject as Project]);
      setDeletedProjects(deletedProjects.filter(p => p.id !== id));
    }
  };

  const permanentlyDeleteProject = (id: string) => {
    setDeletedProjects(deletedProjects.filter(p => p.id !== id));
  };

  const addRequirement = (projectId: string, requirement: Omit<Requirement, 'id' | 'createdAt' | 'comments' | 'activityLog'>) => {
    const newRequirement: Requirement = {
      ...requirement,
      id: Date.now().toString(),
      createdAt: new Date(),
      comments: [],
      activityLog: [
        {
          id: Date.now().toString(),
          action: 'created',
          performedBy: 'Current User',
          timestamp: new Date(),
          details: 'Requirement created',
        },
      ],
    };
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, requirements: [...p.requirements, newRequirement] }
        : p
    ));
  };

  const updateRequirement = (projectId: string, requirementId: string, updatedRequirement: Partial<Requirement>) => {
    setProjects(projects.map(p => 
      p.id === projectId
        ? {
            ...p,
            requirements: p.requirements.map(r =>
              r.id === requirementId ? { ...r, ...updatedRequirement, updatedAt: new Date() } : r
            ),
          }
        : p
    ));
  };

  const deleteRequirement = (projectId: string, requirementId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, requirements: p.requirements.filter(r => r.id !== requirementId) }
        : p
    ));
  };

  const addTeamMember = (projectId: string, member: Omit<TeamMember, 'id' | 'joinedAt'>) => {
    const newMember: TeamMember = {
      ...member,
      id: Date.now().toString(),
      joinedAt: new Date(),
    };
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, team: [...p.team, newMember] }
        : p
    ));
  };

  const updateTeamMember = (projectId: string, memberId: string, member: Partial<TeamMember>) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? {
            ...p,
            team: p.team.map(m =>
              m.id === memberId ? { ...m, ...member } : m
            ),
          }
        : p
    ));
  };

  const removeTeamMember = (projectId: string, memberId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId
        ? { ...p, team: p.team.filter(m => m.id !== memberId) }
        : p
    ));
  };

  const addComment = (projectId: string, requirementId: string | null, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    if (requirementId) {
      setProjects(projects.map(p =>
        p.id === projectId
          ? {
              ...p,
              requirements: p.requirements.map(r =>
                r.id === requirementId
                  ? { ...r, comments: [...r.comments, newComment] }
                  : r
              ),
            }
          : p
      ));
    } else {
      setProjects(projects.map(p =>
        p.id === projectId
          ? { ...p, comments: [...p.comments, newComment] }
          : p
      ));
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        deletedProjects,
        addProject,
        updateProject,
        deleteProject,
        restoreProject,
        permanentlyDeleteProject,
        addRequirement,
        updateRequirement,
        deleteRequirement,
        addTeamMember,
        updateTeamMember,
        removeTeamMember,
        addComment,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectProvider');
  }
  return context;
};
