import axios from 'axios';

export const uploadToFolder = async (
  file: File,
  folder: 'user-profiles' | 'posts'
): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
  formData.append('folder', folder);

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data.secure_url;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }
};
