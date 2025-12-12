import { useState } from 'react';
import { MessageSquare, Reply, Edit2, Trash2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/types/project';
import { toast } from 'sonner';

interface CommentsSectionProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
}

const CommentItem = ({
  comment,
  onReply,
  depth = 0,
}: {
  comment: Comment;
  onReply: (parentId: string) => void;
  depth?: number;
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = () => {
    if (replyContent.trim()) {
      onReply(comment.id);
      toast.success('Reply added');
      setReplyContent('');
      setIsReplying(false);
    }
  };

  return (
    <div className={`${depth > 0 ? 'ml-8 border-l-2 border-border pl-4' : ''}`}>
      <div className="flex gap-3 py-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.authorAvatar} />
          <AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{comment.authorName}</span>
            <span className="text-xs text-muted-foreground">
              {comment.createdAt.toLocaleDateString()} at{' '}
              {comment.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-sm text-foreground">{comment.content}</p>
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setIsReplying(!isReplying)}
            >
              <Reply className="h-3 w-3 mr-1" />
              Reply
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => toast.info('Edit mode - UI only')}
            >
              <Edit2 className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs text-muted-foreground hover:text-destructive"
              onClick={() => toast.info('Delete - UI only')}
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>

          {isReplying && (
            <div className="flex gap-2 mt-2">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[60px] text-sm"
              />
              <div className="flex flex-col gap-1">
                <Button size="sm" onClick={handleReplySubmit}>
                  <Send className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsReplying(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} onReply={onReply} depth={depth + 1} />
      ))}
    </div>
  );
};

const CommentsSection = ({ comments, onAddComment }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={!newComment.trim()}>
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>

        {comments.length > 0 ? (
          <div className="divide-y divide-border">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={(parentId) => onAddComment('', parentId)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No comments yet</p>
            <p className="text-sm text-muted-foreground">Be the first to comment</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentsSection;
