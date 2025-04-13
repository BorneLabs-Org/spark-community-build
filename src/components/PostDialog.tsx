
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const PostDialog = () => {
  const { addPost, currentUser } = useAppContext();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      
      // Determine if it's an image or video
      const fileType = file.type.split('/')[0];
      setMediaType(fileType === 'video' ? 'video' : 'image');
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !mediaPreview) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and add media",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would upload the media to a storage service
    // For now, we'll just use the preview URL
    
    const newPost = {
      id: Date.now().toString(),
      title,
      description,
      media: mediaPreview,
      mediaType,
      user: currentUser!,
      views: 0,
      createdAt: new Date().toISOString()
    };
    
    addPost(newPost);
    
    toast({
      title: "Post created",
      description: "Your post has been successfully created"
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setMediaFile(null);
    setMediaPreview(null);
  };
  
  return (
    <DialogContent className="bg-[#121212] border-gray-800 text-white sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Create New Post</DialogTitle>
        <DialogDescription className="text-gray-400">
          Share your content with the community.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title (required)</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#1a1a1a] border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description (required)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#1a1a1a] border-gray-700 min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Media (required)</Label>
          <div className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="hidden"
              id="postMedia"
            />
            {mediaPreview ? (
              <div className="relative">
                {mediaType === 'image' ? (
                  <img 
                    src={mediaPreview} 
                    alt="Preview" 
                    className="mx-auto h-40 object-contain"
                  />
                ) : (
                  <video 
                    src={mediaPreview} 
                    controls 
                    className="mx-auto h-40"
                  />
                )}
                <Button 
                  type="button"
                  variant="secondary" 
                  className="mt-2"
                  onClick={() => {
                    setMediaFile(null);
                    setMediaPreview(null);
                  }}
                >
                  Change Media
                </Button>
              </div>
            ) : (
              <Label 
                htmlFor="postMedia"
                className="flex flex-col items-center cursor-pointer py-3"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-gray-400">Click to upload image or video</span>
                <span className="text-gray-500 text-sm mt-1">(Max size: 10MB)</span>
              </Label>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" className="w-full bg-teal-700 hover:bg-teal-600">
            Create Post
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
