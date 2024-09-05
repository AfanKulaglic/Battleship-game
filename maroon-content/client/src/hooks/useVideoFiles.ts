import { useEffect, useState } from 'react';

interface UploadedFile {
  _id: string;
  title: string;
  type: string; 
  imageFilePath: string;
  videoFilePath: string;
  source: string; 
}

export const useVideoFiles = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.filter((file: UploadedFile) => file.type === 'video'));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to load video files");
        setLoading(false);
      });
  }, []);

  return { files, loading, error };
};
