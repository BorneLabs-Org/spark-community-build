
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import BackToHomeButton from '@/components/BackToHomeButton';

const Lab = () => {
  const { isLoggedIn } = useAppContext();
  
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
            <h1 className="text-2xl font-bold mb-6">Lab</h1>
            
            <div className="bg-[#1a1a1a] rounded-lg p-6">
              <p className="text-gray-300">
                Welcome to the Bornelabs Lab - This is where cutting-edge research happens.
              </p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#222] p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Ongoing Projects</h3>
                  <p className="text-gray-400">View and collaborate on current research projects</p>
                </div>
                
                <div className="bg-[#222] p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Research Tools</h3>
                  <p className="text-gray-400">Access specialized research tools and resources</p>
                </div>
              </div>
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

export default Lab;
