
import React from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { Paper } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaperCardProps {
  paper: Paper;
  variant?: 'grid' | 'vertical';
}

const PaperCard = ({ paper, variant = 'grid' }: PaperCardProps) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(paper.fileUrl, '_blank');
  };

  if (variant === 'vertical') {
    return (
      <Card className="overflow-hidden bg-[#222] border-gray-700 flex flex-col h-[350px]">
        <div className="relative overflow-hidden h-[200px]">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 z-10 bg-black/40 hover:bg-black/60"
            onClick={handleDownload}
          >
            <Download className="h-5 w-5" />
          </Button>
          <img 
            src={paper.coverImage} 
            alt={paper.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <Link to={`/papers/${paper.id}`}>
            <h3 className="text-lg font-medium text-white hover:text-gray-300 mb-2">{paper.title}</h3>
          </Link>
          <div className="mt-auto flex items-center">
            <img 
              src={paper.user.avatar} 
              alt={paper.user.name} 
              className="h-8 w-8 rounded-full mr-2"
            />
            <div>
              <Link to={`/profile/${paper.user.id}`} className="text-sm text-gray-300 hover:text-white">
                {paper.user.name}
              </Link>
              <p className="text-xs text-gray-500">{new Date(paper.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden bg-[#222] border-gray-700">
      <div className="relative overflow-hidden">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 z-10 bg-black/40 hover:bg-black/60"
          onClick={handleDownload}
        >
          <Download className="h-5 w-5" />
        </Button>
        <img 
          src={paper.coverImage} 
          alt={paper.title} 
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-3">
        <Link to={`/papers/${paper.id}`}>
          <h3 className="text-md font-medium text-white hover:text-gray-300 truncate">{paper.title}</h3>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PaperCard;
