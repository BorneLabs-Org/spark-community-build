
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/app';
import { Project } from '@/types';

const ProjectView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects } = useAppContext();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const currentProject = projects.find(p => p.id === id);
    if (currentProject) {
      setProject(currentProject);
    }
  }, [id, projects]);

  if (!project) {
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
        <div>Project not found</div>
      </div>
    );
  }

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
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <img 
            src={project.user.avatar} 
            alt={project.user.name} 
            className="w-10 h-10 rounded-full"
          />
          <span>Posted by {project.user.name}</span>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700">
          Collaborate
        </Button>
      </div>
      
      <p className="text-gray-300 text-lg whitespace-pre-wrap">{project.description}</p>
    </div>
  );
};

export default ProjectView;
