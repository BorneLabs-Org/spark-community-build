
import React, { useState } from 'react';
import { useAppContext } from '@/context/app';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import RightSidebar from '@/components/RightSidebar';
import ProjectCard from '@/components/ProjectCard';
import PostCard from '@/components/PostCard';
import StoryCard from '@/components/StoryCard';
import PaperCard from '@/components/PaperCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Upload, X, UserPlus } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Profile = () => {
  const { currentUser, projects, posts, stories, papers } = useAppContext();
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result as string);
        setIsUploadDialogOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };
  
  // Filter content based on current user
  const userProjects = projects.filter(project => project.user.id === currentUser?.id);
  const userPosts = posts.filter(post => post.user.id === currentUser?.id);
  const userStories = stories.filter(story => story.user.id === currentUser?.id);
  const userPapers = papers?.filter(paper => paper.user.id === currentUser?.id) || [];
  
  if (!currentUser) {
    return <div>Please sign in to view your profile</div>;
  }
  
  return (
    <div className="min-h-screen bg-[#121212] flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      
      <div className="flex flex-1 pt-[60px]">
        {/* Left Sidebar - hidden on mobile */}
        <div className="hidden md:block fixed top-[60px] bottom-0 left-0 w-56 overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto py-6 px-4 md:px-8 md:ml-56 md:mr-64 w-full">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="relative">
                  <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                    <DialogTrigger asChild>
                      <Avatar className="h-24 w-24 cursor-pointer hover:opacity-80 transition">
                        <AvatarImage src={profileImagePreview || currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback className="bg-gray-800 text-white">
                          {currentUser.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </DialogTrigger>
                    <DialogContent className="bg-[#1a1a1a] border-gray-700">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-medium">Update Profile Picture</h3>
                        
                        <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#222]">
                          <div className="flex flex-col items-center justify-center py-4">
                            <Upload className="h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                            <input 
                              id="profile-image" 
                              type="file" 
                              className="hidden" 
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('profile-image')?.click()}
                              className="mt-2"
                            >
                              Select Image
                            </Button>
                          </div>
                        </div>
                        
                        {profileImagePreview && (
                          <div className="relative mt-2">
                            <img 
                              src={profileImagePreview} 
                              alt="Preview" 
                              className="w-full h-40 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 bg-black/60"
                              onClick={() => setProfileImagePreview(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                    <div className="text-gray-400">@{currentUser.username}</div>
                  </div>
                  
                  <div className="flex justify-center md:justify-start mt-4 gap-4">
                    <div>
                      <span className="font-semibold">254</span> <span className="text-gray-400">Following</span>
                    </div>
                    <div>
                      <span className="font-semibold">{currentUser.followers || 0}</span> <span className="text-gray-400">Followers</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button 
                      className={isFollowing ? "bg-gray-700 hover:bg-gray-600" : "bg-teal-600 hover:bg-teal-500"}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
                      {!isFollowing && <UserPlus className="ml-2 h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs for different content types */}
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="bg-[#1a1a1a] w-full justify-start mb-6">
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="stories">Stories</TabsTrigger>
                <TabsTrigger value="papers">Papers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="projects">
                {userProjects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userProjects.map(project => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No projects yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="posts">
                {userPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPosts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No posts yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="stories">
                {userStories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {userStories.map(story => (
                      <StoryCard key={story.id} story={story} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No stories yet</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="papers">
                {userPapers.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userPapers.map(paper => (
                      <PaperCard key={paper.id} paper={paper} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-400">
                    <p>No papers yet</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        {/* Right Sidebar - hidden on mobile */}
        <div className="hidden md:block fixed top-[60px] bottom-0 right-0 w-64 overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Profile;
