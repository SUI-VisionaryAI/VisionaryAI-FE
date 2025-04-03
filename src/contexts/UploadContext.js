import React, { createContext, useContext, useState } from 'react';
import chunkUpload from 'utils/chunkUploader';

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [uploads, setUploads] = useState([]);

  const startUpload = async (file, modelData) => {
    const fileEntry = {
      file,
      progress: 0,
      status: 'uploading',
      modelData,
    };

    setUploads((prev) => [...prev, fileEntry]);

    const updateProgress = (percent) => {
      setUploads((prev) =>
        prev.map((u) =>
          u.file.name === file.name ? { ...u, progress: percent } : u,
        ),
      );
    };

    try {
      await chunkUpload({ file, modelData, onProgress: updateProgress });

      setUploads((prev) =>
        prev.map((u) =>
          u.file.name === file.name ? { ...u, status: 'done' } : u,
        ),
      );
    } catch (err) {
      console.error('Upload failed:', err);
      setUploads((prev) =>
        prev.map((u) =>
          u.file.name === file.name ? { ...u, status: 'error' } : u,
        ),
      );
    }
  };

  return (
    <UploadContext.Provider value={{ uploads, startUpload }}>
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
