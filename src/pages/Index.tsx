
import React, { useRef } from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import StoryCard from '@/components/StoryCard';
import PaperCard from '@/components/PaperCard';
import { ChevronRight, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const { projects, posts, stories, papers = [], isLoggedIn } = useAppContext();
  const projectsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex flex-1 pt-[60px]">
        {/* Left Sidebar - hidden on mobile */}
        <div className="hidden md:block fixed top-[60px] bottom-0 left-0 w-56 overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Main Content - properly spaced from sidebars */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 md:ml-56 md:mr-64 w-full">
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
            
            <div className="relative" ref={projectsRef}>
              <Carousel>
                <CarouselContent>
                  {projects.map(project => (
                    <CarouselItem key={project.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                      <ProjectCard project={project} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#222]/70 hover:bg-[#333]/90" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#222]/70 hover:bg-[#333]/90" />
              </Carousel>
            </div>
          </div>
          
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">👥</div>
                <h2 className="text-xl font-bold text-white">From Community page</h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {posts.slice(0, 20).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
              
              <Link to="/community" className="flex items-center justify-center text-gray-400 hover:text-white">
                <ChevronRight size={24} />
              </Link>
            </div>
          </div>
          
          <div className="mb-10">
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
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">📄</div>
                <h2 className="text-xl font-bold text-white">Papers</h2>
              </div>
              <Link to="/papers" className="text-sm text-branding-blue hover:underline">
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {papers.slice(0, 4).map(paper => (
                <PaperCard key={paper.id} paper={paper} variant="vertical" />
              ))}
              
              <Link to="/papers" className="flex items-center justify-center text-gray-400 hover:text-white">
                <ChevronRight size={24} />
              </Link>
            </div>
          </div>
        </main>
        
        {/* Right Sidebar - hidden on mobile and properly positioned */}
        {isLoggedIn && (
          <div className="hidden md:block fixed top-[60px] bottom-0 right-0 w-64 overflow-y-auto">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
