
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import StoryCard from '@/components/StoryCard';
import { ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { projects, posts, stories, isLoggedIn } = useAppContext();
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto py-6 px-8">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">📦</div>
                <h2 className="text-xl font-bold text-white">Featured Projects</h2>
              </div>
              <button className="bg-[#222] p-1 rounded hover:bg-[#333]">
                <Filter size={16} className="text-gray-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              
              <Link to="/projects" className="flex items-center justify-center text-gray-400 hover:text-white">
                <ChevronRight size={24} />
              </Link>
            </div>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">👥</div>
                <h2 className="text-xl font-bold text-white">From Community page</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
              
              <Link to="/community" className="flex items-center justify-center text-gray-400 hover:text-white">
                <ChevronRight size={24} />
              </Link>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">📚</div>
                <h2 className="text-xl font-bold text-white">From Community Stories</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.slice(0, 4).map(story => (
                <StoryCard key={story.id} story={story} isCompact={true} />
              ))}
              
              <Link to="/stories" className="flex items-center justify-center text-gray-400 hover:text-white">
                <ChevronRight size={24} />
              </Link>
            </div>
          </div>
        </main>
        
        {isLoggedIn && <RightSidebar />}
      </div>
    </div>
  );
};

export default Index;
