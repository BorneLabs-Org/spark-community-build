
import React from 'react';
import { Story } from '@/types';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { BookOpen, Calendar, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAppContext } from '@/context/app';
import DeleteButton from '@/components/DeleteButton';

interface StoryCardProps {
  story: Story;
  isCompact?: boolean;
}

const StoryCard = ({ story, isCompact = false }: StoryCardProps) => {
  const { title, content, user, createdAt, project, image } = story;
  const { currentUser, deleteStory } = useAppContext();
  const isOwner = currentUser?.id === story.user.id;
  
  // Format the date to relative time (e.g., "3 days ago")
  const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  
  // Truncate the content to a reasonable length for preview
  const truncatedContent = content.length > (isCompact ? 180 : 350) 
    ? `${content.substring(0, isCompact ? 180 : 350)}...` 
    : content;

  return (
    <Card className="bg-[#1a1a1a] border-gray-800 hover:border-gray-700 transition-all overflow-hidden relative">
      <div className={`${isCompact ? 'p-4' : 'p-6'}`}>
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
          <h2 className={`${isCompact ? 'text-lg' : 'text-xl'} font-bold text-white mb-2 hover:text-blue-400 transition-colors break-words`}>{title}</h2>
          
          {image ? (
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="md:w-1/3">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-40 object-cover rounded"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-gray-300 leading-relaxed break-words whitespace-normal">{truncatedContent}</p>
              </div>
            </div>
          ) : (
            <div className="relative min-h-[120px] mb-6">
              <p className="text-gray-300 leading-relaxed break-words whitespace-normal">{truncatedContent}</p>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
            </div>
          )}
        </Link>
        
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar size={14} className="mr-1" />
            <span>{formattedDate}</span>
          </div>
          
          {project && (
            <Link to={`/projects/${project.id}`} className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
              <BookOpen size={14} className="mr-1" />
              <span className="truncate max-w-[200px]">Related Project: {project.name}</span>
            </Link>
          )}
        </div>
      </div>

      {isOwner && (
        <DeleteButton onDelete={() => deleteStory(story.id)} className="bottom-4 right-4" />
      )}
    </Card>
  );
};

export default StoryCard;
