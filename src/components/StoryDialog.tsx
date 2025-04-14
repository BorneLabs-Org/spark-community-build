
import React, { useState } from 'react';
import { useAppContext } from '@/context/app';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Story } from '@/types';
import { Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StoryDialogProps {
  onComplete?: () => void;
}

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  projectId: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const StoryDialog = ({ onComplete }: StoryDialogProps) => {
  const { currentUser, addStory } = useAppContext();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      projectId: '',
      imageUrl: '',
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!currentUser) return;
    
    setIsSubmitting(true);
    
    // Create a new story object
    const newStory: Story = {
      id: `story-${Date.now()}`,
      title: values.title,
      content: values.content,
      user: currentUser,
      createdAt: new Date().toISOString(),
      image: values.imageUrl || undefined,
    };
    
    // Add the story to the context
    addStory(newStory);
    
    // Show success toast
    toast({
      title: "Story published",
      description: "Your story has been successfully published",
    });
    
    // Reset the form
    form.reset();
    setIsSubmitting(false);
    
    // Close the dialog
    if (onComplete) {
      onComplete();
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
          
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Image URL (Optional)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      className="bg-[#222] border-gray-700 text-white pl-9"
                    />
                    <Image className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
              className="bg-teal-700 hover:bg-teal-600 text-white"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Story'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
