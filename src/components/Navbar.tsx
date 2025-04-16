
import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppContext } from '@/context/app';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/SearchBar';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser } = useAppContext();
  const isMobile = useIsMobile();
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleSearch = (query: string, isPidSearch: boolean) => {
    console.log('Searching for:', query, 'PID search:', isPidSearch);
    // Search implementation
  };
  
  return (
    <nav className="bg-[#121212] border-b border-gray-800 px-4 py-2">
      <div className="flex items-center justify-between w-full flex-wrap">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-4">
            <img 
              src="/lovable-uploads/272adb19-93cc-4c1c-b43d-970192a08d48.png" 
              alt="Logo" 
              className="h-10 w-10 mr-2" 
            />
            <div className="text-branding-blue font-bold text-2xl mr-1">Borne</div>
            <div className="text-branding-amber font-bold text-2xl">labs</div>
          </Link>
        </div>
        
        <div className="flex-grow mx-4 max-w-3xl order-3 w-full sm:order-2 sm:w-auto mt-2 sm:mt-0">
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="order-2 sm:order-3">
          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#191919] group">
                  <img 
                    src={currentUser.avatar || "https://github.com/shadcn.png"} 
                    alt="User avatar" 
                    className="h-10 w-10 rounded-full object-cover group-hover:ring-1 group-hover:ring-gray-700"
                  />
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#191919] border border-gray-700">
                <div className="flex items-center p-2">
                  <img 
                    src={currentUser.avatar || "https://github.com/shadcn.png"}
                    alt="Profile" 
                    className="h-10 w-10 rounded-full object-cover mr-2"
                  />
                  <div>
                    <p className="font-medium text-white">{currentUser.name}</p>
                    <Link to="/profile" className="text-sm text-branding-blue">
                      View Account
                    </Link>
                  </div>
                </div>
                <DropdownMenuSeparator className="bg-gray-700" />
                <Link to="/profile">
                  <DropdownMenuItem className="text-white hover:bg-gray-700">
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
                <Link to="/settings">
                  <DropdownMenuItem className="text-white hover:bg-gray-700">
                    <span>Settings</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-white hover:bg-gray-700"
                >
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button variant="default">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
