
import React from 'react';
import PaperCard from '@/components/PaperCard';
import { Paper } from '@/types';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaperCardWrapperProps {
  paper: Paper;
}

const PaperCardWrapper: React.FC<PaperCardWrapperProps> = ({ paper }) => {
  const handleDownload = () => {
    // Handle download logic
    console.log('Downloading paper:', paper.title);
    
    // If paper has a download URL, open it
    if (paper.url) {
      window.open(paper.url, '_blank');
    }
  };
  
  return (
    <div className="relative bg-[#1a1a1a] rounded-lg overflow-hidden">
      <Button 
        onClick={handleDownload}
        className="absolute top-2 right-2 z-10 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.7)] rounded-full p-2"
        size="icon"
      >
        <ArrowDown className="text-[#FFA500] h-5 w-5" />
      </Button>
      
      <PaperCard paper={paper} />
    </div>
  );
};

export default PaperCardWrapper;
