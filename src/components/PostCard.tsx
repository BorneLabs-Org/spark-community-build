
import React from 'react';
import { Post } from '@/types';
import { Eye, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="relative bg-[#121212] rounded-md overflow-hidden group cursor-pointer h-full">
        <div className="aspect-[3/2] overflow-hidden">
          <img 
            src={post.media} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-2 w-full">
          <h3 className="text-sm font-semibold text-white truncate">{post.title}</h3>
          
          <div className="flex items-center mt-1">
            <img 
              src={post.user.avatar} 
              alt={post.user.name}
              className="w-5 h-5 rounded-full mr-1"
            />
            <span className="text-xs text-gray-300 truncate">{post.user.name}</span>
          </div>
          
          <div className="flex items-center mt-1 text-xs text-gray-400">
            <Eye size={12} className="mr-1" />
            <span className="mr-2">{post.views}</span>
            <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
          </div>
        </div>
        
        <button className="absolute top-2 right-2 bg-[#222] p-1 rounded-md hover:bg-[#333] transition-colors">
          <Bookmark size={14} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
