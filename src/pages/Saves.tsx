
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard from '@/components/ProjectCard';
import StoryCard from '@/components/StoryCard';
import BackToHomeButton from '@/components/BackToHomeButton';

const Saves = () => {
  const { projects, stories, isLoggedIn } = useAppContext();
  
  // Filter to only show bookmarked items
  const bookmarkedProjects = projects.filter(project => project.bookmarked);
  const bookmarkedStories = stories.filter(story => story.bookmarked);
  
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
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 md:ml-56 md:mr-64 w-full">
          <BackToHomeButton />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Saved Items</h1>
            
            <Tabs defaultValue="projects">
              <TabsList className="bg-[#1a1a1a] mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                {bookmarkedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {bookmarkedProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved projects yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="stories">
                {bookmarkedStories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {bookmarkedStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved stories yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        {/* Right Sidebar - hidden on mobile */}
        {isLoggedIn && (
          <div className="hidden md:block fixed top-[60px] bottom-0 right-0 w-64 overflow-y-auto">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Saves;
