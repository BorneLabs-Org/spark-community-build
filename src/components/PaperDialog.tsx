import React, { useState } from 'react';
import { useAppContext } from '@/context/app';
import { Upload, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/api/utils';
import { Paper } from '@/types';

interface PaperDialogProps {
  onComplete?: () => void;
}

const PaperDialog = ({ onComplete }: PaperDialogProps) => {
  const { currentUser, addPaper } = useAppContext();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [paperFile, setPaperFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const determineFileType = (filename: string): 'pdf' | 'doc' | 'docx' | 'image' => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    if (extension === 'pdf') return 'pdf';
    if (extension === 'doc') return 'doc';
    if (extension === 'docx') return 'docx';
    return 'image';
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaperFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaperFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    if (!paperFile) {
      toast({
        title: "Error",
        description: "Paper file is required",
        variant: "destructive"
      });
      return;
    }

    if (!coverImage) {
      toast({
        title: "Error",
        description: "Cover image is required",
        variant: "destructive"
      });
      return;
    }

    if (!currentUser) {
      toast({
        title: "Error",
        description: "You must be logged in to publish a paper",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      // Upload files to storage
      const [paperUrl, coverImageUrl] = await Promise.all([
        uploadFile(paperFile, 'papers'),
        uploadFile(coverImage, 'papers')
      ]);

      if (!paperUrl || !coverImageUrl) {
        throw new Error('Failed to upload files');
      }

      // Create the paper
      const newPaper: Omit<Paper, 'id' | 'createdAt' | 'downloads'> = {
        title,
        description,
        fileUrl: paperUrl,
        fileType: determineFileType(paperFile.name),
        coverImage: coverImageUrl,
        user: currentUser
      };

      const success = await addPaper(newPaper);
      
      if (success) {
        // Reset form
        setTitle('');
        setDescription('');
        setPaperFile(null);
        setCoverImage(null);
        setCoverImagePreview('');
        
        // Close dialog
        onComplete?.();
      }
    } catch (error) {
      console.error('Error publishing paper:', error);
      toast({
        title: "Error",
        description: "Failed to publish paper. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[550px] bg-[#121212] text-white border-gray-700">
      <form onSubmit={handleSubmit}>
        <DialogHeader>
          <DialogTitle>Publish a Paper</DialogTitle>
          <DialogDescription className="text-gray-400">
            Share your research, documents, or images with the community.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Paper title"
              className="bg-[#222] border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Add a brief description..."
              className="bg-[#222] border-gray-700 h-20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paper-file">Upload Paper (PDF, Word document, or Image)</Label>
            <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#222]">
              {paperFile ? (
                <div className="flex items-center justify-between">
                  <span className="text-sm">{paperFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setPaperFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">Click to upload or drag and drop</p>
                  <Input 
                    id="paper-file" 
                    type="file" 
                    className="hidden" 
                    onChange={handlePaperFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('paper-file')?.click()}
                    className="mt-2"
                  >
                    Select File
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover-image">Cover Image</Label>
            <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#222]">
              {coverImagePreview ? (
                <div className="relative">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/60"
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImagePreview('');
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-400">Upload an image for your paper</p>
                  <Input 
                    id="cover-image" 
                    type="file" 
                    className="hidden" 
                    onChange={handleCoverImageChange}
                    accept="image/*"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('cover-image')?.click()}
                    className="mt-2"
                  >
                    Select Image
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" disabled={isUploading} className="w-full">
            {isUploading ? "Publishing..." : "Publish Paper"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PaperDialog;
