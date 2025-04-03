import axios from 'axios';

const API = `${process.env.REACT_APP_API_URL}/api`;

const chunkUpload = async ({ file, modelData, onProgress }) => {
  // 1. INIT
  const initRes = await axios.post(`${API}/models/init`, {
    ...modelData,
    fileName: file.name,
  });
  const { uploadId, modelId } = initRes.data;

  const chunkSize = 1 * 1024 * 1024; // 1MB
  const totalChunks = Math.ceil(file.size / chunkSize);

  // 2. Upload Chunks
  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(file.size, start + chunkSize);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('uploadId', uploadId);
    formData.append('chunkIndex', i);
    formData.append('chunk', chunk);

    await axios.post(`${API}/upload/chunk`, formData);
    onProgress(Math.round(((i + 1) / totalChunks) * 100));
  }

  // 3. Finalize
  await axios.post(`${API}/models/finalize`, { uploadId });

  return modelId;
};

export default chunkUpload;
