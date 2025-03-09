'use client'; // This is required because we're using client-side functionality

import { useState } from 'react';
import supabase from '@/utils/supabase';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccess(false);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error } = await supabase.storage
        .from('files') // Replace with your bucket name
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      setUploadSuccess(true);
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Upload a File</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full p-2 border rounded"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploadSuccess && (
          <p className="mt-4 text-green-600 text-center">File uploaded successfully!</p>
        )}
        {uploadError && (
          <p className="mt-4 text-red-600 text-center">{uploadError}</p>
        )}
      </div>
    </div>
  );
}