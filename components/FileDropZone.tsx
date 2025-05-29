'use client';
import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function FileDropZone({ onFile }: { onFile: (f: File) => void }) {
  const [active, setActive] = useState(false);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
    if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]);
  }, [onFile]);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setActive(true); }}
      onDragLeave={() => setActive(false)}
      onDrop={handleDrop}
      className={`border-2 ${active ? 'border-blue-500' : 'border-gray-300'} p-8 rounded-lg text-center`}
    >
      <p className="mb-4 text-gray-600">Drag & drop your USDZ/USDA file</p>
      <Button onClick={() => document.getElementById('file-input')?.click()}>
        Browse Files
      </Button>
      <input
        id="file-input"
        type="file"
        accept=".usdz,.usd,.usda"
        className="hidden"
        onChange={(e) => e.target.files && onFile(e.target.files[0])}
      />
    </div>
  );
} 