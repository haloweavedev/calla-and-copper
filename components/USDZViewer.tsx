'use client';

import { useEffect, useState, useRef } from 'react';
import '@google/model-viewer';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

export default function USDZViewer({ file }: { file: File }) {
  const [objectUrl, setObjectUrl] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create object URL for the file
    const url = URL.createObjectURL(file);
    setObjectUrl(url);

    // Cleanup function to revoke the object URL
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    // Create model-viewer element dynamically to avoid TypeScript issues
    const container = containerRef.current;
    if (container && objectUrl) {
      const modelViewer = document.createElement('model-viewer');
      modelViewer.setAttribute('src', objectUrl);
      modelViewer.setAttribute('alt', 'USDZ 3D preview');
      modelViewer.setAttribute('camera-controls', '');
      modelViewer.setAttribute('ar', '');
      modelViewer.setAttribute('ios-src', objectUrl);
      modelViewer.className = 'w-full h-64 rounded-lg bg-gray-100';
      modelViewer.style.width = '100%';
      modelViewer.style.height = '16rem';
      modelViewer.style.borderRadius = '0.5rem';
      modelViewer.style.backgroundColor = '#f3f4f6';

      // Clear container and add model viewer
      container.innerHTML = '';
      container.appendChild(modelViewer);

      // Cleanup function
      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
    }
  }, [objectUrl]);

  if (!objectUrl) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading 3D preview...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>3D Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full h-64" />
        <p className="text-sm text-gray-500 mt-2">
          Use mouse to rotate • Tap AR button on mobile for augmented reality
        </p>
      </CardContent>
    </Card>
  );
} 