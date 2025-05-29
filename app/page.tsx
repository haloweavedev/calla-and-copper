'use client';
import { useState } from 'react';
import FileDropZone from '@/components/FileDropZone';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    
    // Handle USD/USDA text files
    if (selectedFile.name.endsWith('.usda') || selectedFile.name.endsWith('.usd')) {
      const reader = new FileReader();
      reader.onload = () => console.log(reader.result);
      reader.readAsText(selectedFile);
    }
    
    // TODO: unzip .usdz with jszip and extract .usda entry
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          USD/USDA File Processor
        </h1>
        <p className="text-gray-600">
          Upload your USDZ, USD, or USDA files to process and view them
        </p>
      </div>
      
      <FileDropZone onFile={handleFile} />
      
      {file && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800">
            <strong>Loaded:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      )}
    </div>
  );
}
