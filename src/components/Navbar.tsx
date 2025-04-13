
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

const Navbar = () => {
  const { currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  
  return (
    <nav className="bg-[#121212] border-b border-gray-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <div className="text-branding-blue font-bold text-2xl mr-1">Borne</div>
          <div className="text-branding-amber font-bold text-2xl">labs</div>
        </Link>
      </div>
      
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <div className="flex">
            <Input
              type="text"
              placeholder="Search"
              className="bg-[#222] border-gray-700 rounded-l-md focus:ring-branding-blue focus:border-branding-blue w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center bg-[#222] border border-l-0 border-gray-700 rounded-r-md px-3">
              <span className="text-sm text-gray-400">PID</span>
            </div>
            <Button type="button" className="ml-2 bg-gray-700 hover:bg-gray-600">
              <Search size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        {isLoggedIn && currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <img 
                  src={currentUser.avatar || "https://github.com/shadcn.png"} 
                  alt="User avatar" 
                  className="h-10 w-10 rounded-full object-cover"
                />
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center p-2">
                <img 
                  src={currentUser.avatar || "https://github.com/shadcn.png"}
                  alt="Profile" 
                  className="h-10 w-10 rounded-full object-cover mr-2"
                />
                <div>
                  <p className="font-medium">{currentUser.name}</p>
                  <Link to="/profile" className="text-sm text-branding-blue">
                    View Account
                  </Link>
                </div>
              </div>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem>
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem>
                  <span>Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
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
    </nav>
  );
};

export default Navbar;
