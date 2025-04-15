
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import PaperCard from '@/components/PaperCard';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import PaperDialog from '@/components/PaperDialog';
import { useIsMobile } from '@/hooks/use-mobile';

const Papers = () => {
  const { papers = [], isLoggedIn } = useAppContext();
  const [dialogOpen, setDialogOpen] = React.useState(false);
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
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 md:ml-56 md:mr-64 w-full">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Papers</h1>
              <p className="text-gray-400">Discover research papers, documents, and resources</p>
            </div>
            
            {isLoggedIn && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-700 hover:bg-teal-600">
                    <Upload className="mr-2 h-4 w-4" />
                    Publish Paper
                  </Button>
                </DialogTrigger>
                <PaperDialog onComplete={() => setDialogOpen(false)} />
              </Dialog>
            )}
          </div>
          
          {papers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {papers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <p>No papers published yet</p>
              {isLoggedIn && (
                <Button 
                  className="mt-4 bg-teal-700 hover:bg-teal-600"
                  onClick={() => setDialogOpen(true)}
                >
                  Publish the first paper
                </Button>
              )}
            </div>
          )}
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
