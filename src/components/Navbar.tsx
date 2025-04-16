
import React, { useState } from 'react';
import { Search, ChevronDown, Menu } from 'lucide-react';
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
import { useAuth } from '@/hooks/use-auth';

const Navbar = () => {
  const { currentUser, isLoggedIn } = useAppContext();
  const { signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    signOut();
  };

  const handleSearch = (query: string, isPidSearch: boolean) => {
    console.log('Searching for:', query, 'PID search:', isPidSearch);
    // Search implementation
  };
  
  return (
    <nav className="bg-[#121212] border-b border-gray-800 px-4 py-2">
      <div className="flex items-center w-full">
        <div className="flex items-center flex-shrink-0">
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
        
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-gray-400" />
          </Button>
        )}
        
        <div className={`flex-grow mx-4 hidden md:block max-w-3xl ${mobileMenuOpen ? 'mt-2 block w-full' : ''}`}>
          <SearchBar onSearch={handleSearch} />
        </div>
        
        <div className="ml-auto">
          {isLoggedIn && currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-[#1a1a1a] group">
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
      
      {isMobile && mobileMenuOpen && (
        <div className="mt-2 w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
