
import { supabase } from '@/lib/supabase';

// Function to create necessary storage buckets if they don't exist
export const setupStorage = async () => {
  // Create buckets for different content types
  const buckets = [
    { id: 'avatars', public: true },
    { id: 'projects', public: true },
    { id: 'posts', public: true },
    { id: 'papers', public: true }
  ];
  
  for (const bucket of buckets) {
    // Check if bucket exists
    const { data: existingBuckets } = await supabase
      .storage
      .listBuckets();
      
    const bucketExists = existingBuckets?.some(b => b.name === bucket.id);
    
    if (!bucketExists) {
      // Create bucket
      const { error } = await supabase
        .storage
        .createBucket(bucket.id, {
          public: bucket.public
        });
        
      if (error) {
        console.error(`Error creating bucket ${bucket.id}:`, error);
      } else {
        console.log(`Created bucket: ${bucket.id}`);
      }
    }
  }
};

// Generic file upload function
export const uploadFile = async (
  file: File,
  bucketName: string,
  folder: string = ''
): Promise<string | null> => {
  if (!file) return null;
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;
  
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
      
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

// Remove file from storage
export const removeFile = async (bucketName: string, filePath: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);
      
    if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('Error removing file:', error);
    return false;
  }
};
