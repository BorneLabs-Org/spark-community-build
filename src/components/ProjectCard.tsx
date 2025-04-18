
import React from 'react';
import { Project } from '@/types';
import { Bookmark } from 'lucide-react';
import { useAppContext } from '@/context/app';
import DeleteButton from '@/components/DeleteButton';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { currentUser, deleteProject } = useAppContext();
  const isOwner = currentUser?.id === project.user.id;
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname.includes('/profile');

  const handleClick = () => {
    navigate(`/projects/${project.id}`, { state: { project } });
  };

  return (
    <div className="relative w-full h-full px-2">
      <div 
        className="relative bg-[#121212] rounded-md overflow-hidden group cursor-pointer h-full"
        onClick={handleClick}
      >
        <div className="aspect-square overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 p-3 w-full">
          <h3 className="text-lg font-semibold text-white line-clamp-2">{project.name}</h3>
        </div>
        
        <button className="absolute top-2 right-2 bg-[#222] p-1 rounded-md hover:bg-[#333] transition-colors">
          <Bookmark size={18} className={project.bookmarked ? "fill-yellow-500 text-yellow-500" : "text-white"} />
        </button>

        {isOwner && isProfilePage && (
          <DeleteButton onDelete={() => deleteProject(project.id)} />
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
