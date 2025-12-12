import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Requirement } from '@/types/project';

interface RequirementListProps {
  projectId: string;
  requirements: Requirement[];
  onEdit: (requirement: Requirement) => void;
  onDelete: (requirementId: string) => void;
  onAdd: () => void;
}

const RequirementList = ({
  projectId,
  requirements,
  onEdit,
  onDelete,
  onAdd,
}: RequirementListProps) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(search.toLowerCase()) ||
      req.description.toLowerCase().includes(search.toLowerCase()) ||
      req.reqCode.toLowerCase().includes(search.toLowerCase());

    const matchesType = typeFilter === 'all' || req.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || req.priority === priorityFilter;
    const matchesLevel = levelFilter === 'all' || req.level === levelFilter;

    return matchesSearch && matchesType && matchesPriority && matchesLevel;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'secondary';
      case 'in-progress':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Requirements ({filteredRequirements.length})</CardTitle>
          <Button onClick={onAdd}>
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requirements..."
              className="pl-9"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="functional">Functional</SelectItem>
                <SelectItem value="non-functional">Non-functional</SelectItem>
                <SelectItem value="constraint">Constraint</SelectItem>
                <SelectItem value="interface">Interface</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="subsystem">Subsystem</SelectItem>
                <SelectItem value="component">Component</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Requirements List */}
        {filteredRequirements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {requirements.length === 0
                ? 'No requirements yet'
                : 'No requirements match your filters'}
            </p>
            {requirements.length === 0 && (
              <Button onClick={onAdd}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Requirement
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredRequirements.map((req) => (
              <div
                key={req.id}
                className="py-4 hover:bg-muted/30 -mx-4 px-4 transition-colors cursor-pointer group"
                onClick={() => navigate(`/project/${projectId}/requirement/${req.id}`)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="font-mono text-xs shrink-0">
                        {req.reqCode}
                      </Badge>
                      <h3 className="font-medium truncate">{req.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <Badge variant={getStatusColor(req.status)} className="text-xs">
                        {req.status}
                      </Badge>
                      <Badge variant={getPriorityColor(req.priority)} className="text-xs">
                        {req.priority}
                      </Badge>
                      {req.type && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {req.type}
                        </Badge>
                      )}
                      {req.level && (
                        <Badge variant="outline" className="text-xs capitalize">
                          {req.level}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(req);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(req.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequirementList;
