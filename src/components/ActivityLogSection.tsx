import { History, Plus, Edit2, Trash2, MessageSquare, UserPlus, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ActivityLog } from '@/types/project';

interface ActivityLogSectionProps {
  activities: ActivityLog[];
}

const getActionIcon = (action: ActivityLog['action']) => {
  switch (action) {
    case 'created':
      return <Plus className="h-3 w-3" />;
    case 'edited':
      return <Edit2 className="h-3 w-3" />;
    case 'deleted':
      return <Trash2 className="h-3 w-3" />;
    case 'commented':
      return <MessageSquare className="h-3 w-3" />;
    case 'assigned':
      return <UserPlus className="h-3 w-3" />;
    case 'status_changed':
      return <ArrowRight className="h-3 w-3" />;
    default:
      return <History className="h-3 w-3" />;
  }
};

const getActionColor = (action: ActivityLog['action']) => {
  switch (action) {
    case 'created':
      return 'bg-success text-success-foreground';
    case 'edited':
      return 'bg-info text-info-foreground';
    case 'deleted':
      return 'bg-destructive text-destructive-foreground';
    case 'commented':
      return 'bg-primary text-primary-foreground';
    case 'assigned':
      return 'bg-accent text-accent-foreground';
    case 'status_changed':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getActionLabel = (action: ActivityLog['action']) => {
  switch (action) {
    case 'created':
      return 'Created';
    case 'edited':
      return 'Edited';
    case 'deleted':
      return 'Deleted';
    case 'commented':
      return 'Commented';
    case 'assigned':
      return 'Assigned';
    case 'status_changed':
      return 'Status Changed';
    default:
      return action;
  }
};

const ActivityLogSection = ({ activities }: ActivityLogSectionProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <History className="h-5 w-5" />
          Activity Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <History className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">No activity yet</p>
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="relative flex gap-4">
                  {/* Timeline dot */}
                  <div
                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${getActionColor(
                      activity.action
                    )}`}
                  >
                    {getActionIcon(activity.action)}
                  </div>

                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={activity.performedByAvatar} />
                        <AvatarFallback className="text-xs">
                          {activity.performedBy.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{activity.performedBy}</span>
                      <span className="text-xs text-muted-foreground">
                        {getActionLabel(activity.action)}
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.timestamp.toLocaleDateString()} at{' '}
                      {activity.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    {activity.details && (
                      <p className="text-sm text-foreground mt-1">{activity.details}</p>
                    )}

                    {activity.changes && activity.changes.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {activity.changes.map((change, idx) => (
                          <div
                            key={idx}
                            className="text-xs bg-muted/50 rounded px-2 py-1 inline-flex items-center gap-1 mr-1"
                          >
                            <span className="text-muted-foreground">{change.field}:</span>
                            <span className="line-through text-destructive/70">{change.from}</span>
                            <ArrowRight className="h-2 w-2" />
                            <span className="text-success">{change.to}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityLogSection;
