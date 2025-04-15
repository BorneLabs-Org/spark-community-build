
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import StoryCard from '@/components/StoryCard';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Stories = () => {
  const { stories, isLoggedIn } = useAppContext();
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="fixed top-16 left-0 bottom-0 w-56 z-10">
          <Sidebar />
        </div>
        
        <main className="flex-1 overflow-y-auto py-6 px-8 ml-56 mr-0 md:mr-64">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="text-branding-amber mr-2">📚</div>
                <h2 className="text-xl font-bold text-white">Stories</h2>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[#222] p-1 rounded hover:bg-[#333]">
                  <Filter size={16} className="text-gray-400" />
                </button>
                {isLoggedIn && (
                  <Button 
                    className="bg-teal-700 hover:bg-teal-600 text-white flex items-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Write Story</span>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {stories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
              
              {stories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-lg mb-2">No stories to show</p>
                  <p className="text-sm">Be the first to share your project journey</p>
                </div>
              )}
            </div>
          </div>
        </main>
        
        {isLoggedIn && (
          <div className="hidden md:block fixed top-16 right-0 bottom-0 w-64">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Stories;
