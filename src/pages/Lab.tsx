
import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RightSidebar } from '@/components/RightSidebar';
import { Navbar } from '@/components/Navbar';

const Lab = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          <div className="flex flex-col items-center justify-center h-full">
            <img 
              src="/lovable-uploads/272adb19-93cc-4c1c-b43d-970192a08d48.png" 
              alt="Bornelabs Logo" 
              className="h-24 w-24 mb-4" 
            />
            <h1 className="text-[#33C3F0] text-3xl font-bold">Labs</h1>
            <p className="text-gray-400 mt-4 text-xl">Feature in development</p>
          </div>
        </main>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Lab;
