
import React, { useState } from 'react';
import { useAppContext } from '@/context/app';
import { ProjectDialog } from './ProjectDialog';
import { PostDialog } from './PostDialog';
import { StoryDialog } from './StoryDialog';
import PaperDialog from './PaperDialog';
import { FileText, BookOpen, Menu, Upload } from 'lucide-react';
import { 
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const RightSidebar = () => {
  const { isLoggedIn } = useAppContext();
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [storyDialogOpen, setStoryDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [paperDialogOpen, setPaperDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  if (!isLoggedIn) return null;

  const SidebarContent = () => (
    <div className="w-full h-full bg-[#0a0a0a] border-l border-gray-800 flex flex-col">
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
          <ProjectDialog />
        </Dialog>
        
        <Dialog open={paperDialogOpen} onOpenChange={setPaperDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex justify-start items-center" 
              variant="outline"
            >
              <div className="p-1 mr-2 bg-gray-700 rounded">
                <FileText size={16} />
              </div>
              <span>Publish Paper</span>
            </Button>
          </DialogTrigger>
          <PaperDialog onComplete={() => setPaperDialogOpen(false)} />
        </Dialog>
        
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
  
  // For mobile, we'll use a Sheet component that slides in
  if (isMobile) {
    return (
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full bg-teal-700 hover:bg-teal-600">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-[260px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    );
  }
  
  // For desktop, return the normal sidebar
  return <SidebarContent />;
};

export default RightSidebar;
