
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, FileText, Save, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // List of disabled pages
  const disabledPages = ['/community'];
  
  const isDisabled = (path: string) => {
    return disabledPages.includes(path);
  };
  
  return (
    <aside className="w-56 bg-[#0a0a0a] border-r border-gray-800 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          <li>
            <Link to="/" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <Home className="w-5 h-5 mr-2" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <div className={`flex items-center p-2 rounded-lg ${isDisabled('/community') ? 'cursor-not-allowed' : 'hover:bg-gray-800 cursor-pointer'} ${isActive('/community') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <Users className={`w-5 h-5 mr-2 ${isDisabled('/community') ? 'text-gray-500' : 'text-white'}`} />
              <span className={isDisabled('/community') ? 'text-gray-500' : 'text-white'}>Community page</span>
            </div>
          </li>
          <li>
            <Link to="/lab" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/lab') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <BookOpen className="w-5 h-5 mr-2" />
              <span>Lab</span>
            </Link>
          </li>
          <li>
            <Link to="/stories" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/stories') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <BookOpen className="w-5 h-5 mr-2" />
              <span>Stories</span>
            </Link>
          </li>
          <li>
            <Link to="/papers" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/papers') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <FileText className="w-5 h-5 mr-2" />
              <span>Papers</span>
            </Link>
          </li>
          <li>
            <Link to="/saves" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/saves') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <Save className="w-5 h-5 mr-2" />
              <span>Saves</span>
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="border-t border-gray-800 p-4">
        <Link to="/help" className="flex items-center mb-4 text-white hover:text-gray-300">
          <HelpCircle className="w-5 h-5 mr-2" />
          <span>Help</span>
        </Link>
        
        <div className="flex flex-wrap gap-2 text-xs">
          {/* Quick links with all buttons below Help disabled */}
          {[
            { path: '/what-is-bornelabs', label: 'What is Bornelabs', disabled: true },
            { path: '/project-id', label: 'Project ID', disabled: true },
            { path: '/how-to-start-project', label: 'How to start a project', disabled: true },
            { path: '/stories', label: 'Stories', disabled: true },
            { path: '/iae', label: 'IAE', disabled: true },
            { path: '/sas', label: 'SAS', disabled: true },
            { path: '/faq', label: 'FAQ', disabled: true },
            { path: '/papers', label: 'Papers', disabled: true },
            { path: '/how-to-publish-paper', label: 'How to publish a paper', disabled: true },
            { path: '/requests', label: 'Requests', disabled: true },
            { path: '/community-page', label: 'Community Page', disabled: true },
            { path: '/lab', label: 'Lab', disabled: true }
          ].map((link, index) => (
            <React.Fragment key={index}>
              <div className="bg-transparent px-2 py-1 rounded cursor-not-allowed text-gray-500">
                {link.label}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
