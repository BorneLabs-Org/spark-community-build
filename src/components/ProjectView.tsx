
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Project } from '@/types';

interface ProjectViewProps {
  project: Project;
}

const ProjectView = ({ project }: ProjectViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-gray-800"
        onClick={() => navigate('/')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Button>
      
      <h1 className="text-3xl font-bold text-white mb-6">{project.name}</h1>
      
      <div className="rounded-lg overflow-hidden mb-6">
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-[400px] object-cover"
        />
      </div>
      
      <p className="text-gray-300 text-lg whitespace-pre-wrap">{project.description}</p>
    </div>
  );
};

export default ProjectView;
