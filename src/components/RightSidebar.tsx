
import React, { useState } from 'react';
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
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [storyDialogOpen, setStoryDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  
  if (!isLoggedIn) return null;
  
  return (
    <div className="w-64 bg-[#0a0a0a] border-l border-gray-800 h-full flex flex-col">
      <div className="p-4 space-y-4">
        <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex justify-start items-center" 
              variant="outline"
            >
              <div className="p-1 mr-2 bg-gray-700 rounded">📦</div>
              <span>Start Project</span>
            </Button>
          </DialogTrigger>
          {/* Removing the onComplete prop since ProjectDialog doesn't support it */}
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
        
        <Dialog open={storyDialogOpen} onOpenChange={setStoryDialogOpen}>
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
          <StoryDialog onComplete={() => setStoryDialogOpen(false)} />
        </Dialog>
        
        <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full mt-auto bg-teal-700 hover:bg-teal-600 text-white"
            >
              POST
            </Button>
          </DialogTrigger>
          <PostDialog onComplete={() => setPostDialogOpen(false)} />
        </Dialog>
      </div>
    </div>
  );
};

export default RightSidebar;
