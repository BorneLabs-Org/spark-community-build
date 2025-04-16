
import { supabase } from '@/lib/supabase';

// File upload function (for papers, profile images, etc.)
export const uploadFile = async (file: File, bucket: string, path: string = '') => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = path ? `${path}/${fileName}` : fileName;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);
    
  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }
  
  const { data: publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);
    
  return publicUrl.publicUrl;
};
