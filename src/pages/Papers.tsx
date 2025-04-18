
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import PaperCard from '@/components/PaperCard';
import BackToHomeButton from '@/components/BackToHomeButton';

const Papers = () => {
  const { papers, isLoggedIn } = useAppContext();
  
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
            <h1 className="text-2xl font-bold mb-6 text-white">Papers</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {papers && papers.length > 0 ? (
                papers.map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-400">
                  <p>No papers yet</p>
                </div>
              )}
            </div>
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

export default Papers;
