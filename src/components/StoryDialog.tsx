
import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Story } from '@/types';

const formSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100),
  content: z.string().min(20, { message: 'Content must be at least 20 characters' }),
  projectId: z.string().optional(),
});

export const StoryDialog = () => {
  const { currentUser, addStory } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      projectId: '',
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
    };
    
    // Add the story to the context
    addStory(newStory);
    
    // Reset the form and close the dialog
    form.reset();
    setIsSubmitting(false);
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
