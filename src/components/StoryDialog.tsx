
import React, { useState } from 'react';
import { useAppContext } from '@/context/app';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Story } from '@/types';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/api/utils';

interface StoryDialogProps {
  onComplete?: () => void;
}

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  projectId: z.string().optional(),
});

export const StoryDialog = ({ onComplete }: StoryDialogProps) => {
  const { currentUser, addStory } = useAppContext();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      projectId: '',
    },
  });
  
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
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    try {
      let imageUrl;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, 'stories');
        if (!imageUrl) throw new Error('Failed to upload image');
      }
      
      // Create a new story object
      const newStory: Story = {
        id: `story-${Date.now()}`,
        title: values.title,
        content: values.content,
        user: currentUser,
        createdAt: new Date().toISOString(),
        image: imageUrl,
      };
      
      // Add the story to the context
      await addStory(newStory);
      
      // Show success toast
      toast({
        title: "Story published",
        description: "Your story has been successfully published",
      });
      
      // Reset the form
      form.reset();
      setImageFile(null);
      setImagePreview(null);
      setIsSubmitting(false);
      
      // Close the dialog
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish story",
        variant: "destructive"
      });
      setIsSubmitting(false);
    }
  };
  
  return (
    <DialogContent className="sm:max-w-[600px] bg-[#1a1a1a] text-white border-gray-800">
      <DialogHeader>
        <DialogTitle className="text-xl text-white">Write a Story</DialogTitle>
        <DialogDescription className="text-gray-400">
          Share your project journey, insights, or ideas with the community.
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Story Title"
                    {...field}
                    className="bg-[#222] border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <Label className="text-white">Story Image</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="storyImage"
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
                  htmlFor="storyImage"
                  className="flex flex-col items-center cursor-pointer py-3"
                >
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-gray-400">Click to upload story image</span>
                  <span className="text-gray-500 text-sm mt-1">(Optional)</span>
                </Label>
              )}
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your story..."
                    {...field}
                    className="min-h-[200px] bg-[#222] border-gray-700 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Story'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
