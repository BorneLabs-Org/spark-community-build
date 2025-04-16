
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  onSearch: (query: string, isPidSearch: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPidSearch, setIsPidSearch] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, isPidSearch);
  };
  
  const togglePidSearch = () => {
    setIsPidSearch(!isPidSearch);
  };
  
  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input 
          type="text"
          placeholder={isPidSearch ? "Search by Project ID..." : "Search titles..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 bg-[#1a1a1a] border-gray-700 focus:border-gray-500 text-white w-full"
        />
      </div>
      
      <Button 
        type="button"
        onClick={togglePidSearch}
        className={`px-3 ${isPidSearch 
          ? 'bg-[#F97316] hover:bg-[#F97316]/90 text-white shadow-[0_0_10px_rgba(249,115,22,0.5)]' 
          : 'bg-[#333] hover:bg-[#444] text-gray-300'}`}
        variant="ghost"
      >
        PID
      </Button>
      
      <Button type="submit" className="bg-[#222] hover:bg-[#333] text-white">
        Search
      </Button>
    </form>
  );
};

export default SearchBar;
