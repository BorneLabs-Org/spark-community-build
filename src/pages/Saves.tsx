
import React from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import ProjectCard from '@/components/ProjectCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import StoryCard from '@/components/StoryCard';
import PaperCard from '@/components/PaperCard';
import { Bookmark } from 'lucide-react';

const Saves = () => {
  const { projects, posts, stories, papers, isLoggedIn } = useAppContext();
  
  // In a real app, you would filter based on saved items
  // For now we'll show some sample items as if they were saved
  const savedProjects = projects.slice(0, 2);
  const savedPosts = posts.slice(0, 2);
  const savedStories = stories.slice(0, 2);
  const savedPapers = papers.slice(0, 2);
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex flex-1 pt-[60px]">
        {/* Left Sidebar */}
        <div className="fixed top-[60px] bottom-0 left-0 w-56 overflow-y-auto z-10">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 ml-56 mr-0 md:mr-64">
          <div className="max-w-4xl">
            <div className="flex items-center mb-6">
              <Bookmark className="w-6 h-6 mr-2 text-branding-amber" />
              <h1 className="text-2xl font-bold text-white">Saved Items</h1>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-[#1a1a1a] w-full justify-start mb-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
                <TabsTrigger value="papers">Papers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {(savedProjects.length > 0 || savedPosts.length > 0 || savedStories.length > 0 || savedPapers.length > 0) ? (
                  <div className="space-y-8">
                    {savedProjects.length > 0 && (
                      <div>
                        <h2 className="text-xl font-medium text-white mb-4">Projects</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {savedProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {savedPosts.length > 0 && (
                      <div>
                        <h2 className="text-xl font-medium text-white mb-4">Posts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {savedPosts.map(post => (
                            <PostCard key={post.id} post={post} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {savedStories.length > 0 && (
                      <div>
                        <h2 className="text-xl font-medium text-white mb-4">Stories</h2>
                        <div className="grid grid-cols-1 gap-4">
                          {savedStories.map(story => (
                            <StoryCard key={story.id} story={story} />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {savedPapers.length > 0 && (
                      <div>
                        <h2 className="text-xl font-medium text-white mb-4">Papers</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {savedPapers.map(paper => (
                            <PaperCard key={paper.id} paper={paper} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <Bookmark className="w-10 h-10 mx-auto mb-3 text-gray-600" />
                    <p className="text-lg mb-2">No saved items yet</p>
                    <p className="text-sm">Items you save will appear here</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="projects">
                {savedProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved projects</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="posts">
                {savedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved posts</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="stories">
                {savedStories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {savedStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved stories</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="papers">
                {savedPapers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedPapers.map(paper => (
                      <PaperCard key={paper.id} paper={paper} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No saved papers</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        {/* Right Sidebar */}
        {isLoggedIn && (
          <div className="hidden md:block fixed top-[60px] bottom-0 right-0 w-64 overflow-y-auto">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Saves;
