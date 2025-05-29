'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import FileDropZone from '@/components/FileDropZone';

// Dynamically import components that use browser-only APIs
const USDZViewer = dynamic(() => import('@/components/USDZViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading 3D viewer...</p>
    </div>
  )
});

const USDAInspector = dynamic(() => import('@/components/USDAInspector'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading inspector...</p>
    </div>
  )
});

export default function Page() {
  const [file, setFile] = useState<File | null>(null);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const isUsdFile = file && (
    file.name.endsWith('.usdz') || 
    file.name.endsWith('.usda') || 
    file.name.endsWith('.usd')
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          USD/USDA File Processor
        </h1>
        <p className="text-gray-600">
          Upload your USDZ, USD, or USDA files to view them in 3D and inspect the raw source code
        </p>
      </div>
      
      <div className="space-y-6">
        <FileDropZone onFile={handleFile} />
        
        {file && (
          <div className="space-y-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>Loaded:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </p>
            </div>
            
            {/* 3D Viewer for USDZ files */}
            {file.name.endsWith('.usdz') && (
              <USDZViewer file={file} />
            )}
            
            {/* Raw USD Text Inspector for all USD formats */}
            {isUsdFile && (
              <USDAInspector file={file} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
