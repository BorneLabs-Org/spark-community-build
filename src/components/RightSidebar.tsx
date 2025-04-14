
import React from 'react';
import { useAppContext } from '@/context/app';
import { ProjectDialog } from './ProjectDialog';
import { PostDialog } from './PostDialog';
import { StoryDialog } from './StoryDialog';
import { FileText, BookOpen } from 'lucide-react';
import { 
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const RightSidebar = () => {
  const { isLoggedIn } = useAppContext();
  
  if (!isLoggedIn) return null;
  
  return (
    <div className="w-64 bg-[#0a0a0a] border-l border-gray-800 h-full flex flex-col">
      <div className="p-4 space-y-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex justify-start items-center" 
              variant="outline"
            >
              <div className="p-1 mr-2 bg-gray-700 rounded">📦</div>
              <span>Start Project</span>
            </Button>
          </DialogTrigger>
          <ProjectDialog />
        </Dialog>
        
        <Button 
          className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex justify-start items-center" 
          variant="outline"
        >
          <div className="p-1 mr-2 bg-gray-700 rounded">
            <FileText size={16} />
          </div>
          <span>Publish Paper</span>
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex justify-start items-center" 
              variant="outline"
            >
              <div className="p-1 mr-2 bg-gray-700 rounded">
                <BookOpen size={16} />
              </div>
              <span>Write Story</span>
            </Button>
          </DialogTrigger>
          <StoryDialog />
        </Dialog>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full mt-auto bg-teal-700 hover:bg-teal-600 text-white"
            >
              POST
            </Button>
          </DialogTrigger>
          <PostDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default RightSidebar;
