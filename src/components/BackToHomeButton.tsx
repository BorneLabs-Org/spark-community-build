
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BackToHomeButton = () => {
  return (
    <Link to="/" className="fixed left-4 bottom-4 md:left-6 md:top-20 z-40">
      <Button 
        size="icon" 
        variant="outline"
        className="rounded-full bg-[#1a1a1a] border-gray-700 text-white hover:bg-[#333] h-12 w-12"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
    </Link>
  );
};

export default BackToHomeButton;
