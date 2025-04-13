
import React from 'react';
import { Story } from '@/types';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { BookOpen, Calendar, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StoryCardProps {
  story: Story;
}

const StoryCard = ({ story }: StoryCardProps) => {
  const { title, content, user, createdAt, project } = story;
  
  // Format the date to relative time (e.g., "3 days ago")
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Truncate the content to a reasonable length for preview
  const truncatedContent = content.length > 200 
    ? `${content.substring(0, 200)}...` 
    : content;

  return (
    <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-gray-700">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-gray-800 text-gray-400">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-white font-medium">{user.name}</h3>
              <div className="flex items-center text-xs text-gray-400">
                <span>@{user.username}</span>
                {user.followers && (
                  <span className="ml-2">{user.followers} followers</span>
                )}
              </div>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <Bookmark size={18} />
          </button>
        </div>
        
        <Link to={`/stories/${story.id}`} className="block">
          <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">{title}</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">{truncatedContent}</p>
        </Link>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          {project && (
            <Link to={`/projects/${project.id}`} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
              <BookOpen size={14} className="mr-1" />
              <span>Related Project: {project.name}</span>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StoryCard;
