'use client';
import { useState } from 'react';
import FileDropZone from '@/components/FileDropZone';
import USDAExtractor from '@/components/USDAExtractor';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
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
      
      <div className="space-y-6">
        <FileDropZone onFile={handleFile} />
        
        {file && (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>Loaded:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            </div>
            
            {(file.name.endsWith('.usdz') || 
              file.name.endsWith('.usda') || 
              file.name.endsWith('.usd')) && (
              <USDAExtractor file={file} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
