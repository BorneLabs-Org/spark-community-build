
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, BookOpen, FileText, Save, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
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
            <Link to="/community" className={`flex items-center p-2 rounded-lg hover:bg-gray-800 text-white ${isActive('/community') ? 'bg-gray-800' : 'bg-transparent'}`}>
              <Users className="w-5 h-5 mr-2" />
              <span>Community page</span>
            </Link>
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
          <Link to="/what-is-bornelabs" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            What is Bornelabs
          </Link>
          <Link to="/project-id" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Project ID
          </Link>
          <Link to="/how-to-start-project" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            How to start a project
          </Link>
          <Link to="/stories" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Stories
          </Link>
          <Link to="/iae" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            IAE
          </Link>
          <Link to="/sas" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            SAS
          </Link>
          <Link to="/faq" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            FAQ
          </Link>
          <Link to="/papers" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Papers
          </Link>
          <Link to="/how-to-publish-paper" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            How to publish a paper
          </Link>
          <Link to="/requests" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Requests
          </Link>
          <Link to="/community-page" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Community Page
          </Link>
          <Link to="/lab" className="bg-transparent px-2 py-1 rounded hover:bg-gray-700">
            Lab
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
