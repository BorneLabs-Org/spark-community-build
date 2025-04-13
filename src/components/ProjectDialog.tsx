
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ProjectDialog = () => {
  const { addProject, currentUser } = useAppContext();
  const { toast } = useToast();
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectName || !projectId || !description || !imagePreview) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields and add an image",
        variant: "destructive"
      });
      return;
    }

    // In a real app, we would upload the image to a storage service
    // For now, we'll just use the preview URL
    
    const newProject = {
      id: Date.now().toString(),
      name: projectName,
      description,
      image: imagePreview,
      user: currentUser!,
      sasLevel: "SAS.1"
    };
    
    addProject(newProject);
    
    toast({
      title: "Project created",
      description: "Your project has been successfully created"
    });
    
    // Reset form
    setProjectName('');
    setProjectId('');
    setDescription('');
    setImageFile(null);
    setImagePreview(null);
  };
  
  return (
    <DialogContent className="bg-[#121212] border-gray-800 text-white sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Create New Project</DialogTitle>
        <DialogDescription className="text-gray-400">
          Fill in the details below to create your new project.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name (required)</Label>
          <Input
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-[#1a1a1a] border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="projectId">Project ID (required)</Label>
          <Input
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="bg-[#1a1a1a] border-gray-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Project Description (required)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-[#1a1a1a] border-gray-700 min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Project Image (required)</Label>
          <div className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="projectImage"
            />
            {imagePreview ? (
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="mx-auto h-40 object-contain"
                />
                <Button 
                  type="button"
                  variant="secondary" 
                  className="mt-2"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                >
                  Change Image
                </Button>
              </div>
            ) : (
              <Label 
                htmlFor="projectImage"
                className="flex flex-col items-center cursor-pointer py-3"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <span className="text-gray-400">Click to upload project image</span>
                <span className="text-gray-500 text-sm mt-1">(Max size: 5MB)</span>
              </Label>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" className="w-full bg-branding-blue hover:bg-blue-700">
            Create Project
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
