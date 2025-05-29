'use client';

import { useEffect, useState } from 'react';
import JSZip from 'jszip';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

export default function USDAInspector({ file }: { file: File }) {
  const [rawUsd, setRawUsd] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function extractUsdText() {
      setIsLoading(true);
      
      try {
        if (file.name.endsWith('.usdz')) {
          // Read the file into memory as ArrayBuffer
          const buffer = await file.arrayBuffer();
          // Parse the ZIP archive
          const zip = await JSZip.loadAsync(buffer);
          // Find the first .usda entry and extract its text
          for (const path of Object.keys(zip.files)) {
            if (path.endsWith('.usda')) {
              const zipFile = zip.file(path);
              if (zipFile) {
                const content = await zipFile.async('string');
                setRawUsd(content);
                setIsLoading(false);
                return;
              }
            }
          }
          setRawUsd('// No .usda file found in archive');
        } else if (file.name.endsWith('.usda') || file.name.endsWith('.usd')) {
          // Read plain USD/USDA files directly
          const reader = new FileReader();
          reader.onload = () => {
            setRawUsd(reader.result as string);
            setIsLoading(false);
          };
          reader.readAsText(file);
          return;
        }
      } catch (error) {
        setRawUsd(`// Error extracting USD: ${error}`);
      }
      
      setIsLoading(false);
    }
    
    extractUsdText();
  }, [file]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Raw USD Source Code</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Extracting USD content...</p>
          </div>
        ) : (
          <Textarea
            readOnly
            value={rawUsd}
            className="h-64 font-mono whitespace-pre-wrap text-sm"
            aria-label="Raw USD source code"
            placeholder="USD source code will appear here..."
          />
        )}
      </CardContent>
    </Card>
  );
} 