
import React from 'react';
import { Project } from '@/types';
import { Bookmark } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="relative w-full max-w-xs">
      <div className="relative bg-[#121212] rounded-md overflow-hidden group cursor-pointer">
        <div className="aspect-square overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <h3 className="text-lg font-semibold text-white">{project.name}</h3>
        </div>
        
        <div className="absolute top-2 left-2 bg-[#333] px-2 py-0.5 rounded text-sm text-white">
          {project.sasLevel}
        </div>
        
        <button className="absolute top-2 right-2 bg-[#222] p-1 rounded-md hover:bg-[#333] transition-colors">
          <Bookmark size={18} className={project.bookmarked ? "fill-yellow-500 text-yellow-500" : "text-white"} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
